"use client";
import { useGetUserInfoByIdQuery } from "@/src/redux/featuresApi/user";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import PostCard from "@/src/components/userInterface/PostCard";
import { formatDateTime } from "@/src/utils/date";
import { Suspense, useState } from "react";
import { useGetPostByAuthorQuery } from "@/src/redux/featuresApi/post";
import Cover from "../../_components/Cover";
import FollowingModal from "../../_components/FollowingModal";
import FollowerModal from "../../_components/FollowerModal";
import ErrorBoundary from "@/src/components/ErrorBoundary";

import { TUserDetails } from "@/src/types";
import LoaderSpinner from "@/src/components/userInterface/LoaderSpinner";

const UserInformation = ({ userId }: any) => {
  const [isFollowerModalOpen, setIsFollowerModalOpen] = useState(false);
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);
  const { data } = useGetUserInfoByIdQuery(userId);
  const userDetails = data?.data as TUserDetails;
  const { data: userPosts } = useGetPostByAuthorQuery(userDetails?._id);
  console.log("userPosts:", userPosts);
  const userAllPosts = userPosts?.data;
  return (
    <div>
      <ErrorBoundary fallback={<p>Error</p>}>
        <Suspense fallback={<LoaderSpinner />}>
          <Cover userDetails={userDetails} />
        </Suspense>
      </ErrorBoundary>
      <div className="lg:mt-[125px] lg:px-10 lg:py-5 py-4 px-4 space-y-5">
        <div className="flex items-center gap-5">
          <p className="text-2xl font-bold">{userDetails?.name}</p>
          {userDetails?.status === "premium" && (
            <RiVerifiedBadgeFill className="text-secondary text-xl" />
          )}
        </div>
        <p>{userDetails?.address}</p>
        <p>Joined {formatDateTime(userDetails?.createdAt)}</p>
        <div className="flex items-center gap-5">
          <button onClick={() => setIsFollowingModalOpen(true)}>
            {userDetails?.following.length} Following
          </button>
          <button onClick={() => setIsFollowerModalOpen(true)}>
            {userDetails?.followers.length} Followers
          </button>
        </div>
        <hr />
        <ErrorBoundary fallback={<p>Error</p>}>
          <Suspense fallback={<LoaderSpinner />}>
            <div className="lg:w-1/2 mx-auto">
              <p className="text-xl font-bold mb-5">All posts</p>
              <PostCard data={userAllPosts} profile={true} />
            </div>
          </Suspense>
        </ErrorBoundary>
      </div>
      <FollowingModal
        isOpen={isFollowingModalOpen}
        onClose={() => setIsFollowingModalOpen(false)}
        following={userDetails?.following || []}
      />

      <FollowerModal
        isOpen={isFollowerModalOpen}
        onClose={() => setIsFollowerModalOpen(false)}
        followers={userDetails?.followers || []}
      />
    </div>
  );
};

export default UserInformation;
