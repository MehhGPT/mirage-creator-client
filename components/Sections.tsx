import { Button } from "@/components/ui/button"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { Star, DollarSign, TrendingUp, Users, Award, Zap } from "lucide-react"
import Link from "next/link"

export function Hero() {
    return (
        <div className="text-center flex items-center justify-center h-[100svh] w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden relative">
            <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                        MIRAGE
                    </h1>
                    <p className="text-xl md:text-2xl font-semibold">
                        Create, Share, and Profit from Your Stories
                    </p>
                </div>
                <p className="mx-auto max-w-[700px] text-lg md:text-xl opacity-80 animate-fade-in-up">
                    The ultimate platform for writers, artists, and storytellers to showcase their work, build a fanbase, and earn rewards for their creativity.
                </p>
            </div>
        </div>
    )
}

export function Why() {
    return (
        <div className="w-full py-20 md:py-32 lg:py-40 relative overflow-hidden bg-gray-100 dark:bg-gray-900">
            <div className="container px-4 md:px-6 relative">
                <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-center mb-12 animate-on-scroll">
                    Why Choose Mirage?
                </h2>
                <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        { icon: Star, title: "Showcase Your Talent", description: "Share your stories, novels, manga, or artwork with a global audience and gain recognition for your unique style and creativity." },
                        { icon: DollarSign, title: "Earn Real Rewards", description: "Get paid for your creativity through our unique reward system based on reader engagement and popularity." },
                        { icon: TrendingUp, title: "Grow Your Fanbase", description: "Connect with fans, receive feedback, and build a loyal following for your work across various formats." },
                        { icon: Users, title: "Collaborate with Others", description: "Find like-minded creators, collaborate on projects, and expand your creative network." },
                        { icon: Award, title: "Compete in Contests", description: "Participate in themed contests to challenge your skills and win exclusive prizes in various creative categories." },
                        { icon: Zap, title: "Learn and Improve", description: "Access tutorials, workshops, and resources to enhance your storytelling and artistic skills." },
                    ].map((feature, index) => (
                        <div key={index} className="flex flex-col items-center space-y-4 p-8 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-on-scroll">
                            <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-700">
                                <feature.icon className="h-10 w-10" />
                            </div>
                            <h3 className="text-2xl font-bold text-center">{feature.title}</h3>
                            <p className="text-lg opacity-80 text-center">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export function How() {
    return (
        <div className="w-full py-20 md:py-32 lg:py-40 relative overflow-hidden">
            <div className="container px-4 md:px-6 relative">
                <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-center mb-12 animate-on-scroll">
                    How It Works
                </h2>
                <div className="grid gap-12 lg:grid-cols-3">
                    {[
                        { step: 1, title: "Create and Upload", description: "Write your story, draw your manga, or upload your artwork. We support various formats and styles." },
                        { step: 2, title: "Engage with Readers", description: "Interact with your audience, receive feedback, and build a community around your work." },
                        { step: 3, title: "Earn Rewards", description: "As your content gains popularity, earn points that can be converted into real money or exclusive perks." },
                    ].map((item, index) => (
                        <div key={index} className="flex flex-col items-center space-y-4 p-8 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-on-scroll">
                            <div className="w-16 h-16 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-2xl font-bold">{item.step}</div>
                            <h3 className="text-2xl font-bold text-center">{item.title}</h3>
                            <p className="text-lg opacity-80 text-center">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export function Start() {
    return (
        <div className="w-full py-20 md:py-32 lg:py-40 bg-black text-white dark:bg-white dark:text-black relative overflow-hidden">
            <div className="container px-4 md:px-6 relative">
                <div className="flex flex-col items-center space-y-8 text-center">
                    <div className="space-y-4 max-w-3xl mx-auto animate-on-scroll">
                        <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                            Ready to Start Your Creative Journey?
                        </h2>
                        <p className="mx-auto max-w-[800px] text-xl opacity-80 md:text-2xl">
                            Join CreatorRewards today and turn your passion into profit. Create, share, and earn from your stories, manga, novels, or artwork in a supportive community of creators and readers.
                        </p>
                    </div>
                    <div className="w-full items-center justify-center flex flex-col max-w-md space-y-4 animate-on-scroll">
                        <ConnectButton />
                        <p className="text-sm opacity-80">
                            By signing up, you agree to our Terms of Service and Privacy Policy.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function CreatePage() {
    return (
        <div className="w-full py-20 md:py-32 lg:py-40 relative overflow-hidden bg-gray-100 dark:bg-gray-900">
            <div className="container px-4 md:px-6 relative">
                <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-center mb-12 animate-on-scroll">
                    Create Your Page
                </h2>
                <div className="grid gap-12 lg:grid-cols-3">
                    {[
                        { step: 1, title: "Mint Page", description: "Mint A StoryNFT (Page) for a particluar Story of you liking." },
                        { step: 2, title: "Upload Page", description: "Upload your Creative work, and link it to the NFT." },
                        { step: 3, title: "Complete Creation", description: "Wait for verification, then share your story to others" },
                    ].map((item, index) => (
                        <div key={index} className="flex flex-col items-center space-y-4 p-8 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-on-scroll">
                            <div className="w-16 h-16 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-2xl font-bold">{item.step}</div>
                            <h3 className="text-2xl font-bold text-center">{item.title}</h3>
                            <p className="text-lg opacity-80 text-center">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex items-center justify-center mt-10">
                <Link href="/create/page">
                    <Button size="lg" className="text-lg py-6 px-8 bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-300">
                        Create Your Page Now!!
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export function CreateStory() {
    return (
        <div className="w-full py-20 md:py-32 lg:py-40 relative overflow-hidden bg-gray-100 dark:bg-gray-900">
            <div className="container px-4 md:px-6 relative">
                <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-center mb-12 animate-on-scroll">
                    Start Your Page
                </h2>
                <div className="grid gap-8 lg:grid-cols-4">
                    {[
                        { step: 1, title: "Create Story NFT", description: "Create NFFT for your Story." },
                        { step: 2, title: "Upload Story Cover", description: "Upload Cover for your Story" },
                        { step: 3, title: "Upload Page", description: "Upload your Creative work, and link it to the NFT." },
                        { step: 4, title: "Complete Creation", description: "Wait for verification, then share your story to others" },
                    ].map((item, index) => (
                        <div key={index} className="flex flex-col items-center space-y-4 p-8 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-on-scroll">
                            <div className="w-16 h-16 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-2xl font-bold">{item.step}</div>
                            <h3 className="text-2xl font-bold text-center">{item.title}</h3>
                            <p className="text-lg opacity-80 text-center">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex items-center justify-center mt-10">
                <Link href="/create/page">
                    <Button size="lg" className="text-lg py-6 px-8 bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-300">
                        Create Your Story Now!!
                    </Button>
                </Link>
            </div>
        </div>
    )
}