import NewsCard from "../components/NewsCard";
import { useNewsStore } from "../store/useNewsStore.js";
import { useEffect } from "react";
import { Loader } from "lucide-react";

const NewsPage = () => {
  const { getNews, isLoading, articles } = useNewsStore();

  useEffect(() => {
    getNews();
  }, []);

  return (
    <div>
      <div className="text-center mb-3 text-2xl font-semibold">Latest Travel News</div>
      {isLoading ? <Loader className="text-center m-auto animate-spin h-9 w-9"/> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <NewsCard 
            key={article.article_id}
            title={article.title}
            link={article.link}
            image={article.image_url}
          />
        ))}
      </div>
      )}
    </div>
  );
};

export default NewsPage;
