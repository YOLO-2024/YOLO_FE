// import { CommentIcon } from '../../assets/svgs/CommentIcon';
// import { LikeIcon } from '../../assets/svgs/LikeIcon';
// import LikeWhiteIcon from '../../assets/svgs/LikeWhiteIcon';
// import { ReviewIcon } from '../../assets/svgs/ReviewIcon';
// import defaultImage from '../../assets/images/basicProfile.jpg';
// import '../../styles/pages/Post/PostData.scss';
// import { api } from '../../utils/customAxios';

// //포스트 상세페이지 내부의 포스트 정보
// export default function PostData({ postData }) {
//   const handleLikeCount = () => {
//     api
//       .post(`/api/v1/post/like/${postData.postInfo.postId}`, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       })
//       .then((response) => {
//         console.log(response);
//       })
//       .catch((error) => {
//         console.log('포스트 좋아요: ', error);
//       });
//   };
//   const dateFormatter = (dateTimeString) => {
//     const dateTime = new Date(dateTimeString);
//     const formattedDateTime = `${dateTime.getFullYear()}.${String(dateTime.getMonth() + 1).padStart(2, '0')}.${String(dateTime.getDate()).padStart(2, '0')} ${String(dateTime.getHours()).padStart(2, '0')}:${String(dateTime.getMinutes()).padStart(2, '0')}`;
//     return formattedDateTime;
//   };

//   // useEffect(() => {
//   //   api
//   //     .get('/api/v1/post/check', {
//   //       headers: {
//   //         Authorization: `Bearer ${user}`,
//   //         'Content-Type': 'multipart/form-data',
//   //       },
//   //     })
//   //     .then((response) => {
//   //       console.log(response.data);
//   //       setPostList(response.data);
//   //     })
//   //     .catch((error) => console.log(error));
//   // }, []);

//   return (
//     <div>
//       {/* <div className="postUser-container">
//         <img
//           className="userIcon"
//           src={
//             postData.postInfo.profileImage
//               ? postData.postInfo.profileImage
//               : defaultImage
//           }
//         />

//         <div>
//           <div className="postUser">{postData.writerInfo.nickname}</div>
//           <div className="postCreatedAt">
//             {dateFormatter(postData.postInfo.createdAt)}
//           </div>
//         </div>
//         <div className="likeButton">
//           <LikeWhiteIcon />
//           좋아요
//         </div>
//       </div> */}

//       {/* <div className="postTitle-container">
//         <div className="postTitle">{postData.postInfo.title}</div>


//         <div className="postCategory">
//           {postData.postInfo.categories.map((category, index) => (
//             <span key={index}>#{category.trim()} </span>
//           ))}
//         </div>
//       </div> */}


//       {/* <div className="postContent">{postData.postInfo.content}</div>
//       <div className="postImage-container">
//         {postData.postImage &&
//           postData.postImage.map((img, index) => (
//             <img key={index} className="postImage" src={img.imageUrl} />
//           ))}
//       </div> */}

//       {/* <div className="countContainer">
//         <div className="likeIcon" onClick={handleLikeCount}>
//           <LikeIcon />
//           {postData.postInfo.likeCount}
//         </div>
//         <div>
//           <CommentIcon />
//         </div>
//         <div className="reviewIcon">
//           <ReviewIcon />
//           {postData.postInfo.reviewCount}
//         </div>
//       </div> */}
//     </div>
//   );
// }
