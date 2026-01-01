// "use client";

// import { useTranslations } from "next-intl";
// import SubTitle from "../ui/Subtitle";

// interface BlogPost {
//   id: number;
//   category: string;
//   date: string;
//   title: string;
//   featured?: boolean;
// }

// const blogImages: Record<number, string> = {
//   1: "/images/Blog-1.png",
//   2: "/images/Blog-2.png",
//   3: "/images/Blog-3.png",
//   4: "/images/Blog-4.png",
// };

// const Blog = () => {
//   const t = useTranslations("blog");

//   const posts = t.raw("posts") as BlogPost[];

//   const featuredPost = posts.find((post) => post.featured);
//   const otherPosts = posts.filter((post) => !post.featured);

//   return (
//     <section className="container">
//       <div className="py-[24px] md:py-[50px] lg:py-[72px]">
//         {/* Header */}
//         <div className="flex flex-col items-center justify-center mb-8 md:mb-12 lg:mb-18">
//           <div className="mb-2">
//             <SubTitle text={t("label")} bg="bg-[#A2060233]" />
//           </div>

//           <h2 className="text-[#02093A] text-center">
//             {t("title")}
//           </h2>

//           <p className="text-[#545454] text-center text-[16px] md:text-[18px] leading-[160%] tracking-[-2%] max-w-xl">
//             {t("subtitle")}
//           </p>
//         </div>

//         {/* Blog Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Featured Post */}
//           {featuredPost && (
//             <div className="lg:row-span-2">
//               <article className="group cursor-pointer h-full">
//                 <div className="relative overflow-hidden rounded-2xl mb-4 h-[250px] lg:h-[438px]">
//                   <img
//                     src={blogImages[featuredPost.id]}
//                     alt={featuredPost.title}
//                     className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//                   />
//                 </div>

//                 <div className="space-y-3">
//                   <div className="flex items-center gap-3">
//                     <span className="inline-block bg-[#FFE5E5] text-[#A20602] text-xs font-semibold px-3 py-1 rounded-full">
//                       {featuredPost.category}
//                     </span>
//                     <span className="text-gray-500 text-sm">
//                       {featuredPost.date}
//                     </span>
//                   </div>

//                   <h3 className="text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-[#A20602] transition-colors">
//                     {featuredPost.title}
//                   </h3>
//                 </div>
//               </article>
//             </div>
//           )}

//           {/* Other Posts */}
//           <div className="space-y-6">
//             {otherPosts.map((post) => (
//               <article
//                 key={post.id}
//                 className="group cursor-pointer flex gap-4"
//               >
//                 <div className="relative overflow-hidden rounded-xl flex-shrink-0 w-32 h-24 lg:w-[301px] lg:h-[184px]">
//                   <img
//                     src={blogImages[post.id]}
//                     alt={post.title}
//                     className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//                   />
//                 </div>

//                 <div className="flex-1 space-y-2">
//                   <div className="flex items-center gap-2 flex-wrap">
//                     <span className="inline-block bg-[#FFE5E5] text-[#A20602] text-xs font-semibold px-3 py-1 rounded-full">
//                       {post.category}
//                     </span>
//                     <span className="text-gray-500 text-xs lg:text-sm">
//                       {post.date}
//                     </span>
//                   </div>

//                   <h3 className="text-sm lg:text-base font-bold text-gray-900 group-hover:text-[#A20602] transition-colors line-clamp-3">
//                     {post.title}
//                   </h3>
//                 </div>
//               </article>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Blog;



import { useTranslations } from "next-intl";

type BlogPost = {
  id: number;
  category: string;
  date: string;
  title: string;
  featured?: boolean;
  image?: string;
};

const Blog = () => {
  const t = useTranslations("HomePage.blog"); // Must match the key in sw.json
  const posts = (t.raw("posts") as BlogPost[]) || [];

  const featuredPost = posts.find((post) => post.featured);
  const otherPosts = posts.filter((post) => !post.featured);

  return (
    <section className="container">
      <div className="py-[24px] md:py-[50px] lg:py-[72px]">
        <div className="flex flex-col items-center justify-center mb-8 md:mb-12.5 lg:mb-18">
          <h2 className="text-[#02093A] text-center">{t("title")}</h2>
          <p className="text-[#545454] text-center">{t("subtitle")}</p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {featuredPost && (
            <div className="lg:row-span-2">
              <article className="group cursor-pointer h-full">
                <div className="relative overflow-hidden rounded-2xl mb-4 h-[250px] lg:h-[438px]">
                  <img
                    src={featuredPost.image || "/en/Blog-1.png"}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-block bg-[#FFE5E5] text-[#A20602] text-xs font-semibold px-3 py-1 rounded-full">
                      {featuredPost.category}
                    </span>
                    <span className="text-gray-500 text-sm">{featuredPost.date}</span>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-[#A20602] transition-colors">
                    {featuredPost.title}
                  </h3>
                </div>
              </article>
            </div>
          )}

          <div className="space-y-6">
            {otherPosts.map((post) => (
              <article key={post.id} className="group cursor-pointer flex gap-4">
                <div className="relative overflow-hidden rounded-xl flex-shrink-0 w-32 h-24 lg:w-[301px] lg:h-[184px]">
                  <img
                    src={post.image || "/en/Blog-2.png"}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-block bg-[#FFE5E5] text-[#A20602] text-xs font-semibold px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-xs lg:text-sm">{post.date}</span>
                  </div>
                  <h3 className="text-sm lg:text-base font-bold text-gray-900 group-hover:text-[#A20602] transition-colors line-clamp-3">
                    {post.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
