import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from '@/components/Header';
import { useAccount, useReadContract, useWatchContractEvent, useWriteContract } from 'wagmi';
import { PageCreatorAddress, StoryCreatorAddress } from '@/lib/Addresses';
import StoryCreatorABI from '@/lib/abis/StoryCreator.json';
import PageCreatorABI from '@/lib/abis/PageCreator.json';
import NFTABI from '@/lib/abis/NFT.json';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"


export default function CreateStory() {
	const [coverImages, setCoverImages] = useState<File[]>([]);
	const [pageImages, setPageImages] = useState<File[]>([]);

	const [coverUrls, setCoverUrls] = useState<string[]>([]);
	const [pageUrls, setPageUrls] = useState<string[]>([]);

	const [mintingStory, setMintingStory] = useState(false);
	const [mintedStory, setMintedStory] = useState(false);
	const [mintingPage, setMintingPage] = useState(false);
	const [mintedPage, setMintedPage] = useState(false);

	const [storyID, setStoryID] = useState('');
	const [storyAddress, setStoryAddress] = useState('');
	const [storyName, setStoryName] = useState('');
	const [storyDetails, setStoryDetails] = useState('');

	const [pageID, setPageID] = useState('');
	const { address } = useAccount();
	const parentPageID = 0;

	const createStoryFunction = useWriteContract();
	const createPageFunction = useWriteContract();

	const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const newImages = Array.from(e.target.files);
			if (coverImages.length + newImages.length <= 1) {
				setCoverImages((prev) => [...prev, ...newImages].slice(0, 1));
			} else {
				alert('You can upload a maximum of 3 images.');
			}
		}
	};

	const handlePageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newImages = Array.from(e.target.files);
            if (pageImages.length + newImages.length <= 3) {
                setPageImages((prev) => [...prev, ...newImages].slice(0, 3)); // Ensure a max of 3 images
            } else {
                alert('You can upload a maximum of 3 images.');
            }
        }
    };

	const moveImageUp = (index: number) => {
		if (index === 0) return; // Can't move the first image up
		const newImages = [...pageImages];
		[newImages[index - 1], newImages[index]] = [newImages[index], newImages[index - 1]];
		setPageImages(newImages);
	};

	const moveImageDown = (index: number) => {
		if (index === pageImages.length - 1) return; // Can't move the last image down
		const newImages = [...pageImages];
		[newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]];
		setPageImages(newImages);
	};

	const handleCoverUpload = async () => {
		if (coverImages.length === 0 || !storyID) {
			alert('Please provide both Story ID, Page ID and select images.');
			return;
		}

		setMintingStory(true); // Start loading

		try {
			const urls: string[] = []; // Array to store URLs for all images
			for (let i = 0; i < coverImages.length; i++) {
				const formData = new FormData();
				formData.append('mirage', coverImages[i]);

				// Send each image with the index appended to the file name
				const { data } = await axios.post(
					`/api/cover?storyId=${storyID}&storyAddress=${storyAddress}&creatorAddress=${address}&storyName=${storyName}&storyDetails=${storyDetails}`,
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					}
				);
				urls.push(`${process.env.NEXT_PUBLIC_URL_PROTOCOL}://${data.url}`);
			}
			setCoverUrls(urls);
		} catch (error) {
			console.error('Error uploading file:', error);
		} finally {
			setMintingStory(false);
			setCoverImages([]);
		}
	};
	
	const handlePageUpload = async () => {
		if (pageImages.length === 0 || !pageID) {
			console.log(pageImages.length, pageID);
            alert('Please provide both Story ID, Page ID and select images.');
            return;
        }

        setMintingPage(true); // Start loading

        try {
            const urls: string[] = []; // Array to store URLs for all images
            for (let i = 0; i < pageImages.length; i++) {
				const formData = new FormData();
                formData.append('mirage', pageImages[i]);

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
            setPageUrls(urls); // Set all uploaded URLs
        } catch (error) {
			console.error('Error uploading file:', error);
        } finally {
			setMintingPage(false); // End loading
			setPageImages([]);
        }
    };

	const handleCreateStory = () => {
		setMintingStory(true);
		createStoryFunction.writeContractAsync({
			abi: StoryCreatorABI,
			address: StoryCreatorAddress,
			functionName: "deployStoryNFT",
			args: [],
		})
			.then(() => { })
			.catch((error: any) => { console.log(error); setMintingStory(false); })
	}

	const handleCreatePage = () => {
		setMintingStory(true);
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
			.catch((error: any) => { console.log(error); setMintingPage(false); })
	}

	const StoryList = useWatchContractEvent({
		address: StoryCreatorAddress,
		abi: StoryCreatorABI,
		eventName: 'StoryNFTDeployed',
		onLogs(logs: any) {
			console.log(logs);
			setStoryID(Number(logs[0]?.args.storyId).toString());
			setMintingStory(false);
			setMintedStory(true);
		},
		onError(error) {
			console.log(error);
		},
		syncConnectedChain: true,
		pollingInterval: 500,
		batch: false
	});

	const PageList = useWatchContractEvent({
		address: storyAddress as `0x${string}`,
		abi: NFTABI,
		eventName: 'Transfer',
		args: {
			to: address,
		},
		onLogs(logs: any) {
			// console.log(logs);
			setPageID(Number(logs[0]?.args.tokenId).toString());
			setMintingPage(false);
			setMintedPage(true);
		},
		onError(error) {
			console.log(error);
		},
		syncConnectedChain: true,
		pollingInterval: 500,
		batch: false
	});

	const getStoryAddress = useReadContract({
		abi: StoryCreatorABI,
		address: StoryCreatorAddress,
		functionName: "storyIdToContract",
		args: [
			storyID
		]
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
		StoryList;
		PageList;
	});

	return (
		<div>
			<Header />
			{/* 
				//? Create Story Contract Call 
			*/}
			<div className="max-w-lg mx-auto p-8 bg-gray-100 dark:bg-gray-900 shadow-md rounded-lg mt-[20svh] mb-10">
				<h1 className="text-3xl font-semibold text-black dark:text-white text-center mb-6">Create Your Story</h1>

				<div className="mb-4">
					<label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Story Name</label>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<input
									type="text"
									value={storyName}
									onChange={(e) => setStoryName(e.target.value)}
									className="w-full px-4 py-2 border border-gray-300 text-black rounded focus:outline-none focus:border-blue-500"
									placeholder="Enter Name for your Story..."
								/>
							</TooltipTrigger>
							<TooltipContent>
								Ensure that this Story Name is Correct...
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>

				<div className="mb-4">
					<label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Story Details</label>

					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<input
									type="text"
									value={storyDetails}
									onChange={(e) => setStoryDetails(e.target.value)}
									className="w-full px-4 py-2 border border-gray-300 text-black rounded focus:outline-none focus:border-blue-500"
									placeholder="Story Details..."
								/>
							</TooltipTrigger>
							<TooltipContent>
								Ensure that this Story Details is Correct...
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>

				<div className="mb-4">
					<div>
						{
							mintingStory ? "Creating your Story..."
								:
								<>
									<div className="mb-4">
										<label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Story ID</label>
										<input
											type="text"
											value={storyID}
											onChange={(e) => setStoryID(e.target.value)}
											className="w-full px-4 py-2 border border-gray-300 text-black rounded focus:outline-none focus:border-blue-500"
											placeholder="Story ID"
											disabled
										/>
									</div>

									<div className="mb-4">
										<label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Story Address</label>
										<input
											type="text"
											value={storyAddress}
											onChange={(e) => setStoryAddress(e.target.value)}
											className="w-full px-4 py-2 border border-gray-300 text-black rounded focus:outline-none focus:border-blue-500"
											placeholder="Story Address"
											disabled
										/>
									</div>
								</>
						}
					</div>
				</div>
				{
					!mintedStory &&
					<>
						<div className="text-center">
							<button
								onClick={handleCreateStory}
								disabled={mintingStory}
								className={`px-6 py-2 text-white rounded-full font-semibold focus:outline-none focus:ring ${mintingStory ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
									}`}
							>
								{mintingStory ? 'Creating...' : 'Create Story'}
							</button>
						</div>
					</>
				}
			</div>

			{/*
			 	//? Cover Upload
			*/}
			<div className="max-w-lg mx-auto p-8 bg-gray-100 dark:bg-gray-900 shadow-md rounded-lg mt-[10svh] mb-10">
				<h1 className="text-3xl font-semibold text-black dark:text-white text-center mb-6">Create Your Story</h1>
				{
					mintedStory &&
					<>
						<div className="mb-4">
							<label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Select A Cover Image</label>
							<input
								type="file"
								accept="image/*"
								multiple
								onChange={handleCoverChange}
								className="w-full px-4 py-2 border border-gray-300 text-black rounded bg-white"
							/>
						</div>

						<div className="mb-4">
							<h2 className="text-gray-700 dark:text-gray-300 text-lg font-semibold mb-2">Selected Cover Image</h2>
							{coverImages.map((img, index) => (
								<div key={index} className="flex items-center mb-2">
									<p className="mr-4">{img.name}</p>
								</div>
							))}
						</div>

						<div className="text-center">
							<button
								onClick={handleCoverUpload}
								disabled={coverImages.length === 0 || mintingStory || !storyID}
								className={`px-6 py-2 text-white rounded-full font-semibold focus:outline-none focus:ring ${mintingStory ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
									}`}
							>
								{mintingStory ? 'Uploading...' : 'Upload Images'}
							</button>
						</div>
					</>
				}

				<div className="mt-8 text-center">
					{mintingStory && <p className="text-gray-500">Uploading... Please wait.</p>}

					{coverUrls.length > 0 && (
						<div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
							{coverUrls.map((url, index) => (
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
			{/*
			 	//? Initial Page creation
			*/}
			<div className="max-w-lg mx-auto p-8 bg-gray-100 dark:bg-gray-900 shadow-md rounded-lg mt-[10svh] mb-10">
			<h1 className="text-3xl font-semibold text-black dark:text-white text-center mb-6">Mint your Story Page</h1>

				<div className="mb-4">
					<label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Story ID</label>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<input
									type="text"
									value={storyID}
									className="w-full px-4 py-2 border border-gray-300 text-black rounded focus:outline-none focus:border-blue-500"
									placeholder="Story ID"
									disabled
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
								Ensure that this Story Contract Address is Correct
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
									className="w-full px-4 py-2 border border-gray-300 text-black rounded focus:outline-none focus:border-blue-500"
									placeholder="Enter Parent Page ID"
									disabled
								/>
							</TooltipTrigger>
							<TooltipContent>
								This is First Page So Parent ID is 0
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>

				<div className="mb-4">
					<label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Page ID</label>
					<div>
						{
							mintingPage ? "Minting your Page..." : pageID
						}
					</div>
				</div>
				{
					(!mintedPage && mintedStory) &&
					<>
						<div className="text-center">
							<button
								onClick={handleCreatePage}
								disabled={mintingPage}
								className={`px-6 py-2 text-white rounded-full font-semibold focus:outline-none focus:ring ${mintingPage ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
									}`}
							>
								{mintingPage ? 'Creating...' : 'Create Page'}
							</button>
						</div>
					</>
				}
			</div>

			{/*
			 	//? Page Upload
			*/}
			<div className="max-w-lg mx-auto p-8 bg-gray-100 dark:bg-gray-900 shadow-md rounded-lg mt-[10svh] mb-10">
				<h1 className="text-3xl font-semibold text-black dark:text-white text-center mb-6">Create Your Story</h1>
				{
					mintedPage &&
					<>
						<div className="mb-4">
							<label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Select Pages of your Story</label>
							<input
								type="file"
								accept="image/*"
								multiple
								onChange={handlePageChange}
								className="w-full px-4 py-2 border border-gray-300 text-black rounded bg-white"
							/>
						</div>

						<div className="mb-4">
							<h2 className="text-gray-700 dark:text-gray-300 text-lg font-semibold mb-2">Selected Pages</h2>
							{pageImages.map((img, index) => (
								<div key={index} className="flex items-center mb-2">
									<p className="mr-4">{img.name}</p>
								</div>
							))}
						</div>

						<div className="text-center">
							<button
								onClick={handlePageUpload}
								disabled={pageImages.length === 0 || mintingPage || !storyID}
								className={`px-6 py-2 text-white rounded-full font-semibold focus:outline-none focus:ring ${mintingPage ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
									}`}
							>
								{mintingPage ? 'Uploading...' : 'Upload Images'}
							</button>
						</div>
					</>
				}

				<div className="mt-8 text-center">
					{mintingPage && <p className="text-gray-500">Uploading... Please wait.</p>}

					{pageUrls.length > 0 && (
						<div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
							{pageUrls.map((url, index) => (
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