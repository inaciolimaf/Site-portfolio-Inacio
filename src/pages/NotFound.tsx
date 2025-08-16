import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLocale } from "@/hooks/useLocale";

const NotFound = () => {
  const location = useLocation();
  const { content } = useLocale();

  useEffect(() => {
    console.error(content.notFound.consoleError, location.pathname);
  }, [location.pathname, content.notFound.consoleError]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{content.notFound.title}</h1>
        <p className="text-xl text-gray-600 mb-4">{content.notFound.message}</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          {content.notFound.goHome}
        </a>
      </div>
    </div>
  );
};

export default NotFound;