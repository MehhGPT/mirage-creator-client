'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { Star, DollarSign, TrendingUp, Users, Award, Zap, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef } from "react"

export default function Landing() {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up')
        }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observerRef.current?.observe(el)
    })

    return () => observerRef.current?.disconnect()
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden relative">
          <div className="absolute inset-0 bg-white dark:bg-black">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmZmZmIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiNlZWVlZWUiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMjEyMTIxIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiMzMTMxMzEiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-20" />
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-black/10 dark:bg-white/10 animate-float"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 6 + 1}px`,
                  height: `${Math.random() * 6 + 1}px`,
                  animationDuration: `${Math.random() * 10 + 5}s`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2 animate-fade-in-up">
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
              <div className="flex flex-col sm:flex-row gap-4 mt-8 animate-fade-in-up">
                <Button size="lg" className="text-lg py-6 px-8 bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-300">
                  Start Creating
                </Button>
                <Button size="lg" variant="outline" className="text-lg py-6 px-8 bg-transparent border-black text-black dark:border-white dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300">
                  Explore Stories
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-20 md:py-32 lg:py-40 relative overflow-hidden bg-gray-100 dark:bg-gray-900">
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
        </section>

        <section className="w-full py-20 md:py-32 lg:py-40 relative overflow-hidden">
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
        </section>

        <section className="w-full py-20 md:py-32 lg:py-40 bg-black text-white dark:bg-white dark:text-black relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8cGF0aCBkPSJNMjkuNzUgMEwzMC4yNSA2MEwzMC43NSAwTTAgMjkuNzVMNjAgMzAuMjVMMCAzMC43NU0wIDBMNjAgNjBNNjAgMEwwIDYwIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMC4yNSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSI+PC9wYXRoPgo8L3N2Zz4=')]   dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8cGF0aCBkPSJNMjkuNzUgMEwzMC4yNSA2MEwzMC43NSAwTTAgMjkuNzVMNjAgMzAuMjVMMCAzMC43NU0wIDBMNjAgNjBNNjAgMEwwIDYwIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMC4yNSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-10" />
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
        </section>
      </main>
    </div>
  )
}