import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function CardTopSelling() {
    // const [topLike, setTopLike] = useState([]);

    // useEffect(() => {
    //     const newData = async () => {
    //         try {
    //             const response = await TopTenLikes()
    //             const articleImg = await Promise.all(response.data.result.map(async (result) => {
    //                 const imgData = await axios.get(`https://minpro-blog.purwadhikabootcamp.com/api/blog/${result.id}`);
    //                 const updatedData = {
    //                     id: result.id,
    //                     total_fav: result.total_fav,
    //                     title: result.title,
    //                     imageURL: '',
    //                     category: result.Category.name,
    //                 }

    //                 if (imgData.data && imgData.data[0].imageURL) {
    //                     updatedData.imageURL = `https://minpro-blog.purwadhikabootcamp.com/${imgData.data[0].imageURL}`;
    //                 }
    //                 return updatedData;
    //             }
    //             ))
    //                 .catch((err) => console.log(err));

    //             setTopLike(articleImg);

    //         } catch (err) {
    //             console.log(err)
    //         }
    //     }
    //     newData()
    // }, []);

    return (
        <>
            <div className="flex">
                {/* mapping */}
                {/* <Link to={`/post/${#}`} key={contoh}>
                    <button>
                        <div className="bg-white w-[300px] h-[180px] m-2 rounded-lg shadow-lg flex gap-2 hover:bg-ivory overflow-hidden">
                            <div className="grid-flow-col content-center">
                                <div className="w-[100px] h-[150px]">
                                    <img className="w-[200px] h-[150px] object-cover rounded-tl-lg"
                                        src={#}
                                        alt="img" />
                                </div>
                                <div className="category py-1 bg-sage">
                                    <p className="font-fira text-center">{#}</p>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center w-[183px]">
                                <div className="grid grid-flow-row gap-2">
                                    <div className="flex gap-2 justify-end basis-1/4">
                                        <div className="pt-[3px]">
                                            <div className="bg-darkcho w-5 h-5 rounded-full overflow-hidden">
                                                <img className="w-full h-full"
                                                    src={"../src/assets/IMG_2419.JPG"}
                                                    alt="img" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="basis-2/4 h-32 grid content-end">
                                        <div className="text-left font-libre font-extrabold">{#}</div>
                                    </div>
                                    <div className="basis-1/4 flex gap-1 justify-end">
                                        <div>
                                            <p className="text-xs pt-1">{#}</p>
                                        </div>
                                        <div>
                                            <Link to="/login"><i className='bx bxs-heart mx-[2px]' style={{ color: "#1d0d0c" }} ></i></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </button>
                </Link> */}

            </div>
        </>
    )
}