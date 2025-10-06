import { useUrlState } from '@mints/hooks';
import { useRequest } from '@mints/request/react';
import { Avatar, Button } from '@mints/ui';
import clsx from 'clsx';
import { Link } from 'react-router';

import API from '@/api';
import { useAuth } from '@/auth-context';

const sortOptions = [
  { key: 'latest', label: '最新' },
  { key: 'popular', label: '最热' },
  { key: 'active', label: '活跃' },
  { key: 'no-comment', label: '尚无评论' },
];

export function Home() {
  const [{ sort, q, page }] = useUrlState({
    sort: 'latest',
    q: '',
    page: 1,
  });

  const { user } = useAuth();

  const { loading, data } = useRequest(() => API.topic.query({ page }));

  if (loading || !data) {
    return null;
  }

  const { topics, total } = data;

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-4 py-6">
      <div className="flex-1 mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold mb-4 text-zinc-800">
            {!q ? '全部话题' : `关于 ${q} 的话题`}
          </h2>
          <div className="flex flex-wrap gap-2 mb-2 text-sm font-medium text-zinc-500">
            {sortOptions.map(({ key, label }) => (
              <Link
                key={key}
                to={`?sort=${key}&page=1`}
                className={clsx(
                  'px-2 py-1 rounded transition',
                  sort === key
                    ? 'bg-zinc-900 text-white'
                    : 'hover:bg-zinc-100 text-zinc-600',
                )}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* <div className="bg-zinc-50 px-4 py-3 rounded border border-zinc-200 mb-4">
          <div className="flex flex-wrap gap-4">
            {topTopics.map((topic) => (
              <Link
                key={topic.id}
                to={topic.id}
                className="flex-1 min-w-[200px] rounded border border-zinc-200 bg-white p-3 hover:shadow-sm transition"
              >
                <div className="text-sm font-medium text-zinc-700 mb-2 truncate">
                  {topic.title}
                </div>
                <div className="flex items-center text-xs text-zinc-500 gap-3">
                  <span>👍 {topic.like} 个点赞</span>
                  <span className={clsx('flex items-center gap-1')}>
                    💬 {topic.comment} 个评论
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div> */}

        <div>
          {topics.length === 0 && (
            <div className="text-center text-zinc-400 py-10">暂无内容</div>
          )}

          {topics.map((topic) => (
            <div
              key={topic.id}
              className="bg-white rounded p-4 shadow mb-4 border border-zinc-100"
            >
              <div className="text-sm text-zinc-500 mb-1 flex items-center gap-2">
                <span className="font-medium text-zinc-800">
                  {topic.author.nickname}
                </span>
                <span>· 分享于 {topic.createdAt}</span>
              </div>

              <a
                href={`/topic/${topic.id}`}
                className="block text-lg font-semibold text-zinc-800 hover:underline"
              >
                {topic.title}
              </a>

              <p className="text-sm text-zinc-700 mt-2 line-clamp-2">
                {topic.content}
              </p>

              <div className="flex flex-wrap gap-2 text-xs text-zinc-600 mt-3">
                {topic.tags.map((tag) => (
                  <span key={tag} className="bg-zinc-100 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 text-xs text-zinc-500 mt-3">
                <span>👍 {topic.likeCount}</span>
                <span>💬 {topic.replyCount}</span>
                <span>👀 {topic.visitCount} 次浏览</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-zinc-50 rounded p-4 border border-zinc-200 mt-6 flex justify-center gap-2 text-sm text-zinc-600">
          {Array.from({ length: Math.ceil(total / 20) }, (_, i) => {
            const p = i + 1;
            return (
              <Link
                key={p}
                to={`?sort=${sort}&page=${p}`}
                className={clsx(
                  'px-3 py-1 border rounded',
                  p === page
                    ? 'bg-zinc-900 text-white'
                    : 'border-zinc-300 hover:bg-zinc-100',
                )}
              >
                {p}
              </Link>
            );
          })}
        </div>
      </div>

      <aside className="w-full lg:w-[280px] shrink-0 space-y-4">
        {user ? (
          <>
            <div className="bg-zinc-50 rounded p-4 border border-zinc-200 text-center">
              <Link
                to="/user/setting"
                className="flex flex-col items-center gap-2 hover:opacity-90 transition"
              >
                <Avatar
                  src={user.avatar}
                  name={user.nickname ?? user.email}
                  className="w-16 h-16"
                />
                <span className="text-zinc-800 font-semibold text-base">
                  {user.nickname}
                </span>
              </Link>
              <p className="mt-2 italic text-sm text-zinc-500">
                “{user.signature || '这家伙很懒，什么都没留下'}”
              </p>
            </div>

            <div className="bg-zinc-50 rounded p-4 border border-zinc-200 text-center">
              <Link to="/topic/create">
                <Button className="w-full bg-zinc-900 text-white hover:bg-zinc-700">
                  发布话题
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="bg-zinc-50 rounded p-4 border border-zinc-200 text-center text-zinc-600 space-y-2">
            <p className="text-base font-medium text-zinc-700">
              欢迎来到 Mints 社区 👋
            </p>
            <p className="text-sm leading-relaxed">
              这里汇聚了来自各地的分享者与探索者，讨论生活、职场、成长与灵感。
            </p>
            <p className="text-sm leading-relaxed">
              注册账号即可发布话题、参与评论、收藏你感兴趣的内容。
            </p>
            <Link
              to="/signup"
              className="inline-block mt-2 px-4 py-1.5 text-sm text-white bg-zinc-900 rounded hover:bg-zinc-700 transition"
            >
              立即加入
            </Link>
          </div>
        )}

        {/* <div className="bg-zinc-50 rounded p-4 border border-zinc-200">
          <h2 className="text-sm font-medium text-zinc-500 mb-3">
            今日热议主题
          </h2>
          <ul className="space-y-3">
            {hotTopics.map((topic) => (
              <li key={topic.id} className="flex items-center gap-2">
                <div className="shrink-0">
                  <Avatar
                    src={topic.author.avatar}
                    name={topic.author.nickname ?? topic.author.email}
                  />
                </div>
                <Link
                  href={`/topic/${topic.id}`}
                  className="text-sm text-zinc-700 leading-snug hover:underline"
                >
                  {topic.title}
                </Link>
              </li>
            ))}
          </ul>
        </div> */}
      </aside>
    </div>
  );
}
