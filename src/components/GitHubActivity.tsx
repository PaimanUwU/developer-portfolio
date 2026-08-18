import { useLayoutEffect, useRef } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { motion } from 'framer-motion';

export default function GitHubActivity({ username, className }: { username: string, className?: string }) {
  const calendarRef = useRef<HTMLElement>(null);

  const selectLastSixMonths = (contributions: any[]) => {
    const today = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(today.getMonth() - 6);

    return contributions.filter((activity) => {
      const date = new Date(activity.date);
      return date >= sixMonthsAgo && date <= today;
    });
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: 0.2,
        duration: 0.6,
        ease: "easeOut"
      }}
      className={`hidden desktop:flex flex-col md:p-10 text-accent-content ${className || ''}`}
    >
      <div className="rounded-xl overflow-x-visible h-full pb-4">
        <div className="flex flex-row-reverse justify-end min-w-max">
          <GitHubCalendar
            ref={calendarRef}
            username={username}
            colorScheme="dark"
            transformData={selectLastSixMonths} // Added this prop
            labels={{
              totalCount: '{{count}} contributions',
            }}
            theme={{
              dark: ['#F3F4F6', '#bfdbfe', '#93c5fd', '#60a5fa', '#2563eb'],
            }}
          />
        </div>
      </div>

    </motion.div>
  );
}
