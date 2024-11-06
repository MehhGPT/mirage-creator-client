import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from '@/components/Header';
import { useAccount, useReadContract, useWatchContractEvent, useWriteContract } from 'wagmi';
import { PageCreatorAddress, StoryCreatorAddress } from '@/lib/Addresses';
import PageCreatorABI from '@/lib/abis/PageCreator.json';
import StoryCreatorABI from '@/lib/abis/StoryCreator.json';
import NFTABI from '@/lib/abis/NFT.json';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
// import { ApolloClient, InMemoryCache, gql } from "@apollo/client";


export default function CreatePage() {
    const [images, setImages] = useState<File[]>([]); // Stores up to 3 images
    const [uploadUrls, setUploadUrls] = useState<string[]>([]); // Stores URLs of all uploaded files
    const [loading, setLoading] = useState(false); // Loading state to show UI during upload
    const [minted, setMinted] = useState(false); // Loading state to show UI during upload
    const [storyID, setStoryID] = useState(''); // Input for Story ID
    const [storyAddress, setStoryAddress] = useState('Your Story Address');
    const [parentPageID, setParentPageID] = useState(''); // Input for Story ID
    const [pageID, setPageID] = useState('');
    const { address } = useAccount();
    const createPageFunction = useWriteContract();

    // const APIURL = "https://api.studio.thegraph.com/query/53698/mirage-contracts/version/latest"
    // const client = new ApolloClient({
    // 	uri: APIURL,
    // 	cache: new InMemoryCache(),
    // })

    // Handle multiple image selection (limit to 3 images)
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newImages = Array.from(e.target.files);
            if (images.length + newImages.length <= 3) {
                setImages((prev) => [...prev, ...newImages].slice(0, 3)); // Ensure a max of 3 images
            } else {
                alert('You can upload a maximum of 3 images.');
            }
        }
    };

    // Move image up in the queue
    const moveImageUp = (index: number) => {
        if (index === 0) return; // Can't move the first image up
        const newImages = [...images];
        [newImages[index - 1], newImages[index]] = [newImages[index], newImages[index - 1]];
        setImages(newImages);
    };

    // Move image down in the queue
    const moveImageDown = (index: number) => {
        if (index === images.length - 1) return; // Can't move the last image down
        const newImages = [...images];
        [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]];
        setImages(newImages);
    };

    // Handle the upload of multiple images with index
    const handleUpload = async () => {
        if (images.length === 0 || !storyID || !pageID) {
            alert('Please provide both Story ID, Page ID and select images.');
            return;
        }

        setLoading(true); // Start loading

        try {
            const urls: string[] = []; // Array to store URLs for all images
            for (let i = 0; i < images.length; i++) {
                const formData = new FormData();
                formData.append('mirage', images[i]);

                // Send each image with the index appended to the file name
                const { data } = await axios.post(
                    `/api/upload?storyId=${storyID}&pageId=${pageID}&index=${i + 1}&creatorAddress=${address}&parentPageId=${parentPageID}`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
                urls.push(`${process.env.NEXT_PUBLIC_URL_PROTOCOL}://${data.url}`); // Add uploaded URL to the array
            }
            setUploadUrls(urls); // Set all uploaded URLs
        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            setLoading(false); // End loading
        }
    };

    const handleCreatePage = () => {
        setLoading(true);
        createPageFunction.writeContractAsync({
            abi: PageCreatorABI,
            address: PageCreatorAddress,
            functionName: "createPage",
            args: [
                storyAddress,
                address,
                parentPageID
            ],
        })
            .then(() => { })
            .catch((error: any) => { console.log(error); setLoading(false); })
    }

    const getStoryAddress = useReadContract({
        abi: StoryCreatorABI,
        address: StoryCreatorAddress,
        functionName: "storyIdToContract",
        args: [
            storyID
        ]
    });

    const eventsList = useWatchContractEvent({
        address: storyAddress as `0x${string}`,
        abi: NFTABI,
        eventName: 'Transfer',
        args: {
            to: address,
        },
        onLogs(logs: any) {
            // console.log(logs);
            setPageID(Number(logs[0]?.args.tokenId).toString());
            setLoading(false);
            setMinted(true);
        },
        onError(error) {
            console.log(error);
        },
        syncConnectedChain: true,
        pollingInterval: 500,
        batch: false
    });

    useEffect(() => {
        getStoryAddress.refetch()
            .then((data: any) => {
                setStoryAddress(data.data);
            }).catch((error: any) => {
                console.log(error)
            })
        console.log(storyAddress);
    }, [storyID])

    useEffect(() => {
        eventsList;
    });

    return (
        <div>
            <Header />
            <div className="max-w-lg mx-auto p-8 bg-gray-100 dark:bg-gray-900 shadow-md rounded-lg mt-[20svh] mb-10">
                <h1 className="text-3xl font-semibold text-black dark:text-white text-center mb-6">Create Your Page</h1>

                {/* Input fields for Story ID and Page ID */}
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Story ID</label>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <input
                                    type="text"
                                    value={storyID}
                                    onChange={(e) => setStoryID(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 text-black rounded focus:outline-none focus:border-blue-500"
                                    placeholder="Enter Story ID"
                                />
                            </TooltipTrigger>
                            <TooltipContent>
                                Ensure that this Story Id is Correct...
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Story Address</label>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <input
                                    type="text"
                                    value={storyAddress}
                                    className="w-full px-4 py-2 border border-gray-300 text-black rounded focus:outline-none focus:border-blue-500"
                                    placeholder="Story Address"
                                    disabled
                                />
                            </TooltipTrigger>
                            <TooltipContent>
                                Ensure that this Story Contract Address is Correct...
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Parent Page ID</label>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <input
                                    type="text"
                                    value={parentPageID}
                                    onChange={(e) => setParentPageID(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 text-black rounded focus:outline-none focus:border-blue-500"
                                    placeholder="Enter Parent Page ID"
                                />
                            </TooltipTrigger>
                            <TooltipContent>
                                Ensure that this Parent Page ID is Correct...
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Page ID</label>
                    <div>
                        {
                            loading ? "Minting your Page..." : pageID
                        }
                    </div>
                </div>

                {
                    !minted &&
                    <>
                        <div className="text-center">
                            <button
                                onClick={handleCreatePage}
                                disabled={loading}
                                className={`px-6 py-2 text-white rounded-full font-semibold focus:outline-none focus:ring ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                                    }`}
                            >
                                {loading ? 'Creating...' : 'Create Page'}
                            </button>
                        </div>
                    </>
                }

                {/* File input for selecting images (up to 3) */}
                {
                    minted &&
                    <>
                        <div className="mb-4">
                            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Select Images (Max 3)</label>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageChange}
                                className="w-full px-4 py-2 border border-gray-300 text-black rounded bg-white"
                            />
                        </div>

                        {/* Display selected images with controls to reorder them */}
                        <div className="mb-4">
                            <h2 className="text-gray-700 dark:text-gray-300 text-lg font-semibold mb-2">Selected Images</h2>
                            {images.map((img, index) => (
                                <div key={index} className="flex items-center mb-2">
                                    <p className="mr-4">{img.name}</p>
                                    <button
                                        onClick={() => moveImageUp(index)}
                                        disabled={index === 0}
                                        className="bg-gray-200 dark:bg-gray-600 px-2 py-1 text-xs rounded-full mr-2"
                                    >
                                        Move Up
                                    </button>
                                    <button
                                        onClick={() => moveImageDown(index)}
                                        disabled={index === images.length - 1}
                                        className="bg-gray-200 dark:bg-gray-600 px-2 py-1 text-xs rounded-full"
                                    >
                                        Move Down
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Upload button */}
                        <div className="text-center">
                            <button
                                onClick={handleUpload}
                                disabled={images.length === 0 || loading || !storyID || !pageID}
                                className={`px-6 py-2 text-white rounded-full font-semibold focus:outline-none focus:ring ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                                    }`}
                            >
                                {loading ? 'Uploading...' : 'Upload Images'}
                            </button>
                        </div>
                    </>
                }

                {/* Show uploaded images or loading state */}
                <div className="mt-8 text-center">
                    {loading && <p className="text-gray-500">Uploading... Please wait.</p>}

                    {uploadUrls.length > 0 && (
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {uploadUrls.map((url, index) => (
                                <div key={index} className="max-w-xs mx-auto">
                                    <img
                                        src={url}
                                        alt={`Uploaded ${index + 1}`}
                                        className="max-w-full h-auto rounded-lg drop-shadow-lg"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}