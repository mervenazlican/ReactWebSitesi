import {  makeStyles } from "@material-ui/core";
import React,{useState,useEffect} from "react";
import Post from "../Post/Post";
import PostForm from "../Post/PostForm";


const useStyles = makeStyles((theme) => ({
    container: {
        width: "100%",
        display:"flex",
        flexWrap:"wrap",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#e3f2fd"
    }
}));


function Home(){

    const [error,setError] = useState(null);
    const [isLoaded,setIsLoaded] = useState(false);
    const [postList,setPostList] = useState([]);
    const classes = useStyles();

    const refreshPosts = () => {
        fetch("/posts")
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setPostList(result)
            },
            (error) => {
                console.log(error);
                setIsLoaded(true);
                setError(error);
            }
        )
    }

    useEffect(() => {
        refreshPosts()
    },[postList])

    if(error) {
        return <div>Error</div>;

    }else if(!isLoaded){
        return <div>Loading..</div>;
    }else {
        return (
            <div className={classes.container}>  
            <PostForm userId={1} userName={"ddd"} refreshPosts = {refreshPosts}/>  
            {postList.map(post => ( 
                <Post likes={post.postLikes} postId={post.id} userId={post.userId} userName={post.userName} 
                title={post.title} text={post.text}
                ></Post>    
            
            ))}
            </div> 
        );
    }
 
}

export default Home;