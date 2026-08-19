import { motion } from "framer-motion";

interface BlogPost {
  slug: string;
  data: {
    title: string;
    description: string;
    pubDate: Date;
    updatedDate?: Date;
    heroImage?: string;
    tags: string[];
  };
}

export default function BlogList({ posts }: { posts: BlogPost[] }) {

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-6 px-0 desktop:pl-6 pb-20">
      {posts.map((post: BlogPost, index: number) => {
        const { title, description, pubDate, tags, heroImage } = post.data;

        return (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
          >
          <a href={`/blog/${post.slug}`} class="group flex flex-col h-full bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-gray-200 transition-all duration-500 hover:-translate-y-2">
            {/* Image Container */}
            <a href={`/blog/${post.slug}`} className="relative h-56 w-full overflow-hidden hidden desktop:block">
              {heroImage ? (
                <img
                  src={heroImage}
                  alt={title}
                  className=" w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                  <div className="w-12 h-12 text-gray-200">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </a>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center gap-3 mb-3">
                <time className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">
                  {formatDate(pubDate)}
                </time>
                <div className="h-px w-8 bg-gray-100" />
              </div>

              <a href={`/blog/${post.slug}`} className="block group/title">
                <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover/title:text-blue-500 transition-colors">
                  {title}
                </h2>
              </a>

              <p className="text-sm text-gray-500 leading-relaxed mb-6 line-clamp-3">
                {description}
              </p>

              <div className="mt-auto pt-6 flex flex-wrap gap-2 items-center border-t border-gray-50">
                {tags.slice(0, 3).map((tag: string) => (
                  <span key={tag} className="px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-md text-[10px] font-bold uppercase tracking-wider text-gray-700">
                    #{tag}
                  </span>
                ))}

                <a
                  href={`/blog/${post.slug}`}
                  className="ml-auto hidden desktop:flex items-center group cursor-pointer"
                >
                  {/* The "Read More" text */}
                  <span className="max-w-0 overflow-hidden whitespace-nowrap text-[10px] font-mono font-bold text-blue-500 transition-all duration-500 ease-in-out group-hover:max-w-[100px] group-hover:mr-3 opacity-0 group-hover:opacity-100">
                    READ MORE
                  </span>

                  {/* The Circle Arrow */}
                  <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white transition-all duration-300 group-hover:bg-blue-500 group-hover:scale-110">
                    <span className="text-lg leading-none transition-transform duration-300 group-hover:translate-x-0.5">
                      →
                    </span>
                  </div>
                </a>
              </div>
            </div>

          </a>
          </motion.div>
        );
      })}
    </div>
  );
}
