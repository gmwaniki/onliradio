export default async function Page({ params }: { params: { id: string } }) {
  console.log(params);

  return <>{params.id}</>;
}
