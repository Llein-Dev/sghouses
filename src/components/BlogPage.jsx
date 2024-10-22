import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for news articles
const featuredNews = {
    id: '1',
    title: 'Major Breakthrough in Renewable Energy',
    excerpt: 'Scientists have made a groundbreaking discovery that could revolutionize the way we harness solar power, potentially solving global energy crisis.',
    image: '/mau-sac-hai-hoa-mang-den-Background-dep.jpg',
    date: '2023-05-20',
}

const sideNews = [
    { id: '2', title: 'Stock Market Hits Record High', excerpt: 'Global markets surge as economic recovery accelerates.', image: '/mau-sac-hai-hoa-mang-den-Background-dep.jpg', date: '2023-05-19' },
    { id: '3', title: 'New AI Model Surpasses Human Performance', excerpt: 'OpenAIs latest language model achieves unprecedented scores on cognitive tests.', image: '/mau-sac-hai-hoa-mang-den-Background-dep.jpg', date: '2023-05-18' },
    { id: '4', title: 'Climate Summit Reaches Landmark Agreement', excerpt: 'World leaders commit to ambitious carbon reduction targets.', image: '/mau-sac-hai-hoa-mang-den-Background-dep.jpg', date: '2023-05-17' },
]

const moreNews = [
    { id: '5', title: 'SpaceX Launches First Civilian Mission to Mars', excerpt: 'Private space company makes history with groundbreaking interplanetary journey.', image: '/mau-sac-hai-hoa-mang-den-Background-dep.jpg', date: '2023-05-16' },
    { id: '6', title: 'Global Pandemic Officially Declared Over', excerpt: 'WHO announces end of COVID-19 pandemic as vaccination efforts prove successful.', image: '/mau-sac-hai-hoa-mang-den-Background-dep.jpg', date: '2023-05-15' },
    { id: '7', title: 'Quantum Computing Breakthrough Promises Faster Drug Discovery', excerpt: 'Researchers use quantum algorithms to simulate complex molecular interactions.', image: '/mau-sac-hai-hoa-mang-den-Background-dep.jpg', date: '2023-05-14' },
    { id: '8', title: 'Self-Driving Cars Get Green Light for Urban Use', excerpt: 'Government approves autonomous vehicles for city streets after successful trials.', image: '/mau-sac-hai-hoa-mang-den-Background-dep.jpg', date: '2023-05-13' },
]

const recommendedNews = [
    { id: '9', title: 'New Study Links Coffee Consumption to Longevity', date: '2023-05-12' },
    { id: '10', title: 'Tech Giants Announce Collaboration on AR Glasses', date: '2023-05-11' },
    { id: '11', title: 'Archaeologists Uncover Ancient City in Amazon Rainforest', date: '2023-05-10' },
    { id: '12', title: 'Renewable Energy Surpasses Fossil Fuels in Global Usage', date: '2023-05-09' },
]

function NewsCard({ id, title, excerpt, image, date }) {
    return (
        <Card className="h-full flex flex-col">
            <div className="relative h-48">
                <img src={image} alt={title} fill className="object-cover" />
            </div>
            <CardHeader>
                <CardTitle className="text-lg">{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">{excerpt}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">{date}</span>
                <Link href={`/news/${id}`} className="text-primary hover:underline text-sm">
                    Read more
                </Link>
            </CardFooter>
        </Card>
    )
}
function NewsCardRow({ id, title, excerpt, image, date }) {
    return (
        <Card className="h-full  flex flex-row">
            <div className="h-full aspect-[4/3] overflow-hidden">
                <img src={image} alt={title} fill className="object-cover h-full" />
            </div>
            <CardHeader>
                <CardTitle className="text-lg">{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">{excerpt}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">{date}</span>
                <Link href={`/news/${id}`} className="text-primary hover:underline text-sm">
                    Read more
                </Link>
            </CardFooter>
        </Card>
    )
}

export default function NewsHomepage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Daily News</h1>
                <p className="text-muted-foreground">Your source for the latest updates</p>
            </header>


            {/* Featured news and side news section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="md:col-span-2 space-y-4 h-full flex flex-col">
                    <div className="relative aspect-video overflow-hidden">
                        <img src={featuredNews.image} alt={featuredNews.title} fill className="object-cover w-full" />
                    </div>
                    <CardHeader>
                        <CardTitle className="text-2xl">{featuredNews.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{featuredNews.excerpt}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">{featuredNews.date}</span>
                        <Link href={`/news/${featuredNews.id}`} className="text-primary hover:underline">
                            Read full story
                        </Link>
                    </CardFooter>
                </Card>

                {/* Side news */}
                <div className="space-y-4 h-full grid-cols-1">
                    {sideNews.map((news) => (
                        < NewsCardRow key={news.id} {...news} />
                    ))}
                </div>
            </div>
            {/* More news section */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">More News</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {moreNews.map((news) => (
                        <NewsCard key={news.id} {...news} />
                    ))}
                </div>
            </section>

            {/* Recommended news section */}
            <section>
                <h2 className="text-2xl font-bold mb-4">Recommended for You</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recommendedNews.map((news) => (
                        <Card key={news.id} className="flex items-center p-4">
                            <div className="mr-4 bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                                {news.id}
                            </div>
                            <div>
                                <h3 className="font-semibold">{news.title}</h3>
                                <p className="text-sm text-muted-foreground">{news.date}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    )
}