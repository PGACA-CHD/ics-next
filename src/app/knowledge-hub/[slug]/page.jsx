import ArticleClient from './client';

export const dynamic = 'force-dynamic';

export default function Page({ params }) {
  return <ArticleClient params={params} />;
}
