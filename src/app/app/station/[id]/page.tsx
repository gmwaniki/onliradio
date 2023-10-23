export default async function Page({ params }: { params: { id: string } }) {
  return <>{params.id}</>;
}
