import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  featuredNews,
  moreNews,
  recommendedNews,
  sideNews,
} from "@/utils/data";
import Breadcrumb from "@/components/breadcum";
import { useFetchBlogHouse } from "@/utils/api/GET/api";
function NewsCard({ id, title, excerpt, image, date }) {
  return (
    <Card className="h-full flex  overflow-hidden flex-col">
      <div className="w-full aspect-video overflow-hidden">
        <img
          src={`http://localhost:8000/storage/${image}`}
          alt={title}
          className="object-cover w-full h-full"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">{excerpt}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-xs text-muted-foreground">{date}</span>
        <Link
          href={`/news/${id}`}
          className="text-primary hover:underline text-sm"
        >
          Xem thêm
        </Link>
      </CardFooter>
    </Card>
  );
}
function NewsCardRow({ id, title, excerpt, image, date }) {
  return (
    <Card className="h-full flex  overflow-hidden flex-row">
      <div className="w-2/5 aspect-square overflow-hidden">
        <img
          src={`http://localhost:8000/storage/${image}`}
          alt={title}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col justify-between w-3/5">
        <CardHeader>
          <CardTitle className="text-lg">
            <Link href={`/blog/${id}`}>{title}</Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground">{excerpt}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">{date}</span>
          <Link
            href={`/blog/${id}`}
            className="text-primary hover:underline text-sm"
          >
            Xem thêm
          </Link>
        </CardFooter>
      </div>
    </Card>
  );
}

export default function NewsHomepage() {
  // Use the custom hook to fetch data
  const { BlogHouse, loading, error } = useFetchBlogHouse();

  if (loading) return <p>Loading...</p>; // Handle loading state
  if (error) return <p>Error fetching news: {error.message}</p>; // Handle error state

  const featuredNews = BlogHouse[0]; // Assuming the first item is featured
  const sideNews = BlogHouse.slice(1, 4); // Adjust the slicing based on your data structure
  const moreNews = BlogHouse.slice(4, 8); // Adjust accordingly
  const recommendedNews = BlogHouse.slice(8, 12); // Adjust accordingly

  return (
    <div className="container mx-auto px-4 space-y-4 py-4">
      <Breadcrumb />
      <section className="pb-4">
        <div className="relative rounded px-2">
          <div className="absolute inset-0 flex items-center px-4">
            <div className="shrink-0 bg-blue-900 h-[1px] w-full"></div>
          </div>
          <div className="relative flex items-center h-full justify-start">
            <h2 className="text-blue-900 px-4 bg-gray-100 text-center text-xl md:text-3xl m-0 font-bold">
              Tin tức nổi bật
            </h2>
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Large News */}
        <Card className="md:col-span-2 space-y-2 h-full flex flex-col overflow-hidden">
          <div className="relative aspect-video overflow-hidden">
            <img
               src={`http://localhost:8000/storage/${featuredNews.image}`}
              alt={featuredNews.title}
              className="object-cover w-full"
            />
          </div>
          <CardHeader>
            <CardTitle className="text-2xl">
              {" "}
              <Link href={`/blog/${featuredNews.slug}`}>
                {featuredNews.title}{" "}
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {featuredNews.content.slice(0, 100)}...
            </p>{" "}
            {/* Display a snippet of the content */}
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {new Date(featuredNews.created_at).toLocaleDateString()}
            </span>
            <Link
              href={`/blog/${featuredNews.slug}`}
              className="text-primary hover:underline"
            >
              Xem thêm
            </Link>
          </CardFooter>
        </Card>
        {/* Side news */}
        <div className="space-y-4 h-full flex flex-col">
          {sideNews.map((news) => (
            <NewsCardRow key={news.id} {...news} />
          ))}
        </div>
      </section>
      {/* More news section */}
      <section className="">
        <h2 className="text-2xl font-bold mb-4">Tin tức khác</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {moreNews.map((news) => (
            <NewsCard key={news.id} {...news} />
          ))}
        </div>
      </section>
      {/* Recommended news section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Danh mục</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {recommendedNews.map((news) => (
            <Card key={news.id} className="flex items-center p-4">
              <div className="mr-4 bg-primary text-primary-foreground rounded-full aspect-square h-12 flex items-center justify-center text-xl font-bold">
                {news.id}
              </div>
              <div>
                <h3 className="font-semibold">{news.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(news.created_at).toLocaleDateString()}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
