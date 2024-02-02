import { Skeleton } from "components/ui/skeleton";
import { User } from "types/user";

const OwnerInfo = ({ owner }: { owner: User }) => {
  if (!owner)
    return (
      <div className="mt-20 p-4 flex flex-col space-y-5">
        <Skeleton className="h-20 w-20 rounded-full" />
        <Skeleton className="h-6 w-[450px]" />
        <Skeleton className="h-6 w-[250px]" />
      </div>
    );
  return (
    <div className="mt-20 p-4 flex flex-col space-y-5">
      <Skeleton className="h-20 w-20 rounded-full" />
      <Skeleton className="h-6 w-[500px]" />
      <Skeleton className="h-6 w-[250px]" />
    </div>
  );
};
export default OwnerInfo;
