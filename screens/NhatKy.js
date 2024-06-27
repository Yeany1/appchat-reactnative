import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import Header1 from "../components/Header1";
import Header2 from "../components/Header2";
import { Avatar, Box, Button, Icon, ImageViewer, Input, Modal, Sheet } from "zmp-ui";
import { useSelector } from "react-redux";
import { ImageBackground } from "react-native";
import LinearGradient from "react-native-web-linear-gradient";
import formatCustomDate from "../util/formatDate";
import { useDispatch } from "react-redux";
import { refreshPosts } from "../features/posts/postsSlice";
const NhatKy = ({navigation, route}) => {
    const soDienThoai = useSelector((state) => state.users.soDienThoai);
    // const isPostsChange = useSelector((state) => state.posts.temp); 
    const dispatch = useDispatch(); 

    
    useEffect(() => {
        setInterval(refresh, 2000)
    }, [])
    const handleRefreshPost = () => {
        dispatch(refreshPosts())
    }

    const [user, setUser] = useState({});
    useEffect( () => {
        fetch(`http://localhost:3000/users?soDienThoai=${soDienThoai}`)
            .then(res => res.json())
            .then((user) => {
                setUser(user[0])
            })
    }, [])
    const [actionSheetVisible, setActionSheetVisible] = useState(false);
    const [sheetVisible, setSheetVisible] = useState(false);
    const [stories, setStories] = useState([]);
    const [posts, setPosts] = useState([]);
    const [tyms, setTyms] = useState([]);
    const users = [];
    const [dsusers,setDsusers] = useState([])
    const [visible, setVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [images, setImages] = useState([]);

    const [popupVisible, setPopupVisible] = useState(false);
    const [postChose, setPostChose] = useState({});
    const [commentContent, setCommentContent] = useState('');
    let count = 0;

    const [comments, setComments] = useState([
        {
            "id": 1,
            "postId": 2,
            "user": "0333900858", 
            "content": "Đây là bình luận 1",
            "date": "2023-11-24T23:54:00.772Z"
        },
    ]);

    const fetchStories = () => {
        fetch('http://localhost:3000/stories')
            .then(res => res.json()) 
            .then((stories1) => {
                if(stories1)
                setStories(stories1.reverse())
            })
    }
    const fetchPosts = () => {
        fetch('http://localhost:3000/posts')
            .then(res => res.json()) 
            .then((posts1) => {
                if(posts1)
                setPosts(posts1.reverse())
            })
    }
    const fetchTyms = () => {
        fetch('http://localhost:3000/tyms')
            .then(res => res.json()) 
            .then((tyms1) => {
                if(tyms1)
                    setTyms(tyms1)
            })
    }
    const fetchUsers = () => {
        fetch('http://localhost:3000/users')
            .then(res => res.json()) 
            .then((usersss) => {
                if(usersss)
                setDsusers(usersss)
            })
    }

    const fetchComments = ()=> {
        fetch('http://localhost:3000/comments')
            .then(res => res.json()) 
            .then((cmts) => {
                if(cmts)
                setComments(cmts)
            })
    }

    useEffect(() => {
        fetchStories(); 
        fetchPosts(); 
        fetchUsers(); 
        fetchTyms();
        fetchComments(); 
    }, [])
    

    const refresh  = () => {
        fetchStories(); 
        fetchPosts(); 
        fetchUsers(); 
        fetchTyms();
        fetchComments();
    }

    const ItemStory = ({item}) => {
        if( users.includes(item.user) ) return <></>; 
        count += 1; 
        users.push(item.user)
        const User = dsusers.find(user => user.soDienThoai === item.user);
        let avatar, imgStory;
        try {
            avatar = require(`../assets/stories/${User?.avatar}`);
        } catch (error) {
            avatar = require('../assets/avatar-fallback.png');
        }
        try {
            imgStory = require(`../assets/stories/${item.img}`); 
        } catch (error) {
            imgStory = require('../assets/avatar-fallback.png');
        }

        return (
        <ImageBackground  source={imgStory} resizeMode={'cover'} style={styles.box2}>
            <Pressable style={styles.overlay} onPress={() => {navigation.navigate({name: 'Story', params: {item:item, fetchStories}})}}>
                <Avatar story="default" backgroundColor="PURPLE-BLUE" online={User?.status==='online'} size={48} 
                    src={avatar}
                    style={{position:'absolute',bottom: 30}}
                />
                <Text style={{color: '#fff', position:'absolute',bottom: 12}} > {item.userName} </Text>
            </Pressable>
        </ImageBackground>)
    }
    const ItemPost = ({item}) => {
        const [coTym, setCoTym] = useState(tyms.find((item2) => soDienThoai===item2.user && item.id === item2.postId))
        const [soLuongTym, setSoLuongTym]  = useState(tyms.reduce((result,item1) => item1.postId === item.id ? result + 1 : result , 0))
        const [soLuongComment, setSoLuongComment]  = useState(comments.reduce((result,item1) => item1.postId === item.id ? result + 1 : result , 0))
        const User = dsusers.find(user => user.soDienThoai === item.user);
        let avatar;
        try {
            avatar = require(`../assets/stories/${User?.avatar}`);
        } catch (error) {
            avatar = require('../assets/avatar-fallback.png');
        }
        return(
            <Pressable style={{marginBottom: 12, backgroundColor: '#fff'}}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                        <Avatar story="default" backgroundColor="PURPLE-BLUE" online={User?.status==='online'} size={48}
                            src={avatar}
                            style={{marginRight: 20}}
                            onClick={() => {
                                let str = stories.find((item2) => item2.user === item.user); 
                                if(str) 
                                    navigation.navigate({
                                        name: 'Story', 
                                        params: {
                                            item:str,
                                            fetchStories
                                        }
                                    }) 
                                else {
                                    navigation.navigate({
                                        name: 'TrangCaNhan',
                                        params: {
                                            user: User
                                        }
                                    })
                                }
                            }}
                        />
                        <View>
                            <Pressable onPress={() => navigation.navigate({name: 'TrangCaNhan', params: {user: User}})}>
                                <Text style={{fontSize: 18, fontWeight: 600}}>{User?.ten}</Text>
                            </Pressable>
                            <Text style={{fontSize: 16, color: '#666'}}>{formatCustomDate(item?.date)}</Text>
                        </View>
                    </View>

                    { item.user===user.soDienThoai && <Pressable onPress={() => {
                        setPostChose(item)
                        setActionSheetVisible(true)
                    }}>
                        <Icon icon="zi-more-horiz"/>
                    </Pressable>}
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20}}>
                    <Text style={{fontSize: 18}}>{item?.content}</Text>
                </View>

                {/* ảnh */}
                <Pressable style={{paddingHorizontal:20}} onPress={()=> {
                    setImages(item.images.map((item, index) => ({
                        src: require(`../assets/stories/${item}`),
                        key: `${index+1}`,
                    })))
                }}>
                    <Box mt={6}>
            <Box mt={2}>
            <Box flex flexDirection="row" flexWrap="nowrap">
                {item.images.map((item, index) => ({
                        src: require(`../assets/stories/${item}`),
                        key: `${index+1}`,
                    })).map((img, index) => (
                <Box
                    mr={1}
                    key={img.key}
                    style={{
                    width: "68px",
                    height: "69px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    }}
                >
                    <img
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    role="presentation"
                    onClick={() => {
                        setActiveIndex(index);
                        setVisible(true);
                    }}
                    src={img.src}
                    />
                </Box>
                ))}
            </Box>
            </Box>
                    </Box>
                </Pressable>

                <View style={{flexDirection:'row', alignItems:'center',justifyContent: 'flex-start', padding: 20}}>
                    <Pressable style={{flexDirection: 'row', alignItems: 'center', paddingRight: 26}}
                        onPress={() => {
                            if(!coTym) {
                                setCoTym(true)
                                setSoLuongTym(soLuongTym + 1)
                                fetch('http://localhost:3000/tyms', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        user: soDienThoai,
                                        postId: item.id,
                                        date: new Date()
                                    })
                                })
                                .then(() => fetchTyms())
                            } else {
                                setCoTym(false)
                                setSoLuongTym(soLuongTym - 1)
                                fetch(`http://localhost:3000/tyms/${coTym.id}`, {
                                    method: 'DELETE',
                                })
                                .then(() => fetchTyms())
                            }
                        }}  
                    >
                        <Icon icon={`zi-heart${ coTym ? '-solid' : '' }`} style={{color:coTym ? '#DC1F18' : '#000'}} />
                        <Text style={{marginLeft: 6}}> {soLuongTym}</Text>
                    </Pressable>
                    <Pressable style={{flexDirection: 'row', alignItems: 'center', paddingRight: 26}} 
                        onPress={() => {
                            setPostChose(item)
                            setSheetVisible(true)
                        }}
                    
                    >
                        <Icon icon="zi-chat"/>
                        <Text style={{marginLeft: 6}}>{soLuongComment}</Text>
                    </Pressable>
                </View>
            </Pressable>
        )
    }

    const handleDangBai = () => {
        navigation.navigate({
            name: 'Đăng bài', 
            params: {
                fetchPosts,
                handleRefreshPost,
            }
        })
    }


    let avatar;
    try {
        avatar = require(`../assets/stories/${user?.avatar}`);
    } catch (error) {
        avatar = require('../assets/avatar-fallback.png');
    }
    return (
        <View>
            <ImageViewer
                onClose={() => setVisible(false)}
                activeIndex={activeIndex}
                images={images}
                visible={visible}
            />
            <View style={styles.header}>
                <Header1 />
                <Header2 />
                <Pressable style={styles.btn_search}>
                    <Icon icon="zi-search" style={styles.search_icon} />
                </Pressable>
                <TextInput style={styles.input_search} placeholder="Tìm kiếm" />
                <Pressable
                    style={styles.btn_setting}
                    onPress={() => refresh()}
                >
                    <Icon icon="zi-notif" style={styles.setting_icon} />
                </Pressable>
                <Pressable
                    style={styles.btn_setting2}
                    onPress={handleDangBai}
                >
                    <Icon icon="zi-add-photo" style={styles.setting_icon} />
                </Pressable>
            </View>
            
            <ScrollView style={styles.body}>
                <View style={{padding: 20, backgroundColor: '#fff', marginBottom: 12}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', paddingBottom: 20}}>
                        <Image source={avatar} 
                        style={{width: 58, height: 58, borderRadius: '50%', marginRight: 16}}/>
                        <Pressable 
                            onPress={handleDangBai}
                            // style={{backgroundColor:'red'}}
                        >
                            <Text style={{fontSize: 18, color: '#8A8A8A'}}>Hôm nay bạn thế nào?</Text>
                        </Pressable>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Button prefixIcon={<Icon icon="zi-photo-solid" style={{color: '#9DCF3C'}}/>}
                            variant="secondary"
                            type="neutral"
                            size="medium"
                            onClick={handleDangBai}
                        >
                            Ảnh
                        </Button>
                        <Button prefixIcon={<Icon icon="zi-video-solid" style={{color: '#FF7B89'}}/>}
                            variant="secondary"
                            type="neutral"
                            size="medium"
                            style={{marginRight:4, marginLeft:4}}
                        >
                            Video
                        </Button>
                        <Button prefixIcon={<Icon icon="zi-gallery" style={{color: '#01A7F3'}}/>}
                            variant="secondary"
                            type="neutral"
                            size="medium"
                        >
                            Album
                        </Button>
                    </View>
                </View>

                <View style={{backgroundColor: '#fff', padding: 20, marginBottom: 12}}>
                    <Text style={{fontSize: 18, fontWeight: 600, paddingBottom: 20}}> Khoảnh khắc </Text>
                    <ScrollView horizontal>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Pressable onPress={() => navigation.navigate({name: 'Chọn ảnh', params: {screen: 'DangStory', fetchStories}})}>
                                <LinearGradient
                                    colors={['#6a40bf', '#52a0ff']}
                                    style={styles.box2}
                                >
                                    <Avatar story="default" backgroundColor="PURPLE-BLUE" online={false} size={48}
                                        src={avatar}
                                        style={{position:'absolute',bottom: 30}}
                                    />
                                    <Text style={{color: '#fff', position:'absolute',bottom: 12}} > Tạo mới </Text>
                                </LinearGradient>

                            </Pressable>


                            {
                               stories.map((item) => {
                                return(<ItemStory key={item.id} item={item} />)
                               })
                            }

                        </View>
                    </ScrollView>
                </View>

                <View style={{}}>
                    {posts.map((item) => {
                        return(<ItemPost key={item.id} item={item} />)
                    })}
                </View>
            </ScrollView>
            <Sheet.Actions
                mask
                visible={actionSheetVisible}
                onClose={() => setActionSheetVisible(false)}
                swipeToClose
                actions={[
                [
                    { 
                        text: "Xóa", 
                        danger: true,
                        onClick: () => {
                            setPopupVisible(true);
                            setActionSheetVisible(false);
                        }
                    },
                    {
                        text: "Sửa",
                        // close: true,
                        onClick: () => {
                            setActionSheetVisible(false);
                            navigation.navigate({name: 'Đăng bài', params: {fetchPosts, post: postChose}});
                        }
                    },
                ],
                [
                    {
                        text: "Hủy",
                        close: true,
                    }
                ]
                ]}
                style={{paddingBottom: 80}}
            />

            <Modal
                visible={popupVisible}
                title="Bạn chắc chắn muốn xóa"
                onClose={() => {
                setPopupVisible(false);
                }}
                verticalActions
                description="Hành động này không thể hoàn tác. Bài viết sẽ được xóa vĩnh viễn"
            >
                <Box p={6} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <Button
                        onClick={() => {
                            setPostChose({});
                            setPopupVisible(false);
                        }}
                        size="small"
                        style={{width: 120, margin: 8, }}
                        variant="secondary"
                    >
                        Hủy
                    </Button>
                    <Button
             
                        onClick={() => {
                            setPopupVisible(false);
                            fetch('http://localhost:3000/posts/' + postChose.id, {
                                method: 'DELETE',
                            }).then(() => fetchPosts())
                        }}
                        size="small"
                        type="danger"
                        style={{width: 120, margin: 8,}}
                    >
                        Xác nhận
                    </Button>
                </Box>
            </Modal>
            <Sheet
                visible={sheetVisible}
                onClose={() => setSheetVisible(false)}
                autoHeight
                mask
                handler
                swipeToClose
                title="Bình luận"
                style={{paddingBottom: 80, maxHeight: '70%',}}
                
            >  
                <ScrollView>
                    {
                        comments.filter((item) => item.postId === postChose.id).map((item) => {
                            const user1 = dsusers.find((user) => user.soDienThoai === item.user ); 
                            const img = user1?.avatar; 
                            let avatar; 
                            try {
                                avatar = require(`../assets/stories/${img}`)
                            } catch {
                                avatar = require(`../assets/stories/defaultAvatar.jpg`)
                            }
                            return(
                                <View key={item.id} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16}}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Avatar src={avatar} online={user?.status === 'online'} size={32} />
                                        <View style={{flexDirection: 'column', alignItems: 'flex-start', paddingHorizontal: 12}}>
                                            <Text style={{fontWeight: 'bold'}}> {user?.ten} </Text>
                                            <Text style={{paddingVertical: 4}}> {item.content} </Text>
                                            <Text style={{fontSize: 12, color: '#858C94'}}> {formatCustomDate(item.date)}</Text>
                                        </View>
                                    </View>
                                    {(item.user===user.soDienThoai) && <Icon icon="zi-delete" 
                                        onClick={() => {
                                            fetch('http://localhost:3000/comments/' + item.id, {
                                                method: 'DELETE',
                                            }).then(fetchComments)
                                        }}
                                    />}
                                </View>
                            )
                        })
                    }
                </ScrollView>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                    <TextInput 
                        placeholder="Nhập bình luận"
                        placeholderTextColor='#666'
                        style={{
                            paddingHorizontal: 16, 
                            height: 60, 
                            outlineColor: 'transparent',
                            outlineStyle: 'none',
                            backgroundColor: '#FAFAFA', 
                            borderTopWidth: 1, 
                            borderTopColor: '#E0E0E0', 
                            width: '100%'
                        }}
                        onChangeText={(text) => setCommentContent(text)}
                        value={commentContent}
                    />
                    <Pressable style={{position: 'absolute', right: 16}}
                        onPress={() => {
                            if (commentContent) {
                               fetch('http://localhost:3000/comments', {
                                   method: 'POST', 
                                   headers : {
                                       'Content-Type': 'application/json'
                                   }, 
                                   body: JSON.stringify({
                                       postId: postChose.id,
                                       user: soDienThoai,
                                       content: commentContent,
                                       date: new Date().toISOString()
                                   })
                               }).then(fetchComments)
                               .then(() => {
                                setCommentContent('')
                               })
                            }
                        }}
                    >
                        <Icon icon="zi-send-solid" style={{color: commentContent ? "#1194FF" : "#DFDFDF", fontSize: 38}}/>
                    </Pressable>
                </View>
            </Sheet>
        </View>
    );
};

export default NhatKy;

const styles = StyleSheet.create({
    header: {
        position: "fixed",
        zIndex: 2,
    },
    btn_search: {
        zIndex: 1,
        position: "absolute",
        top: 48,
        left: 24,
    },
    search_icon: {
        color: "#fff",
        fontSize: 30,
    },
    input_search: {
        zIndex: 1,
        top: 40,
        position: "absolute",
        cursor: "auto",
        left: 72,
        height: 48,
        width: 240,
        paddingLeft: 4,
        fontSize: 16,
        color: "rgba(255, 255, 255, 0.7)",
        outlineColor: "transparent",
        outlineStyle: "none",
    },

    btn_setting: {
        zIndex: 3,
        position: "relative",
        top: 48,
        left: 340,
        left: 'calc(100vw - 58px)',
    },
    btn_setting2: {
        zIndex: 3,
        position: "relative",
        top: 17.5,
        left:300,
        left: 'calc(100vw - 98px)',
    },
    setting_icon: {
        color: "#fff",
        fontSize: 30,
    },
    body: {
        marginTop: 88,
        height: "100vh",
        paddingBottom: 150,
    },
    box2: {
        borderRadius: 8,
        borderStyle: "solid",
        borderWidth: 1,
        width: 105,
        height: 164, 
        overflow: 'hidden', 
        alignItems: 'center',
        marginRight: 16,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject, 
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
