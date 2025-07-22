import React from "react";
import { FileText, Edit2, ExternalLink } from "lucide-react";

function BlogPosts() {
  const wordpressDashboardUrl = `${
    import.meta.env.VITE_API_WP_URL
  }/wp-admin/edit.php`;

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center px-4 text-center space-y-6 bg-gray-50">
      <FileText className="h-16 w-16 text-red-600 mx-auto" />
      <h1 className="text-3xl font-bold">Gestion des articles de blog</h1>
      <p className="max-w-md text-gray-700">
        Gérez facilement vos articles de blog directement depuis le tableau de
        bord WordPress. Ajoutez, modifiez ou supprimez vos publications en toute
        simplicité.
      </p>
      <div className="flex items-center space-x-2 text-red-600 mx-auto">
        <Edit2 className="h-6 w-6" />
        <span className="font-semibold">
          Accédez au tableau de bord WordPress
        </span>
      </div>
      <button
        onClick={() => window.open(wordpressDashboardUrl, "_blank")}
        className="mt-4 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-md font-semibold flex items-center space-x-2 transition-colors"
      >
        <span>Voir les articles</span>
        <ExternalLink className="h-5 w-5" />
      </button>
    </div>
  );
}

export default BlogPosts;
