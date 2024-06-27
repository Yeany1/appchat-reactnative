import { Image, ImageBackground, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, Icon, ImageViewer, Input, Modal, Sheet } from "zmp-ui"; 
import { ScrollView } from "react-native";
import { useSelector } from "react-redux";
import formatCustomDate from "../util/formatDate";
const TrangCaNhan = ({ navigation, route }) => {

    const [actionSheetVisible, setActionSheetVisible] = useState(false);
    const soDienThoai = useSelector((state) => state.users.soDienThoai);
    const [stories, setStories] = useState([]);
    const [posts, setPosts] = useState([]);
    const [tyms, setTyms] = useState([]);
    const [dsusers,setDsusers] = useState([])
    const [visible, setVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);const [images, setImages] = useState([
        {
          src: "https://stc-zmp.zadn.vn/zmp-zaui/images/e2e10aa1a6087a5623192.jpg",
          alt: "img 1",
          key: "1",
        },
        {
          src: "https://stc-zmp.zadn.vn/zmp-zaui/images/fee40cbea0177c4925061.jpg",
          alt: "img 2",
          key: "2",
        },
        {
          src: "https://stc-zmp.zadn.vn/zmp-zaui/images/82ca759bd932056c5c233.jpg",
          alt: "img 3",
          key: "3",
        },
        {
          src: "https://stc-zmp.zadn.vn/zmp-zaui/images/77f5b8cd1464c83a91754.jpg",
          alt: "img 4",
          key: "4",
        },
    ]);
    const [popupVisible, setPopupVisible] = useState(false);
    const [postChose, setPostChose] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [userchosen, setUserchosen] = useState({});
    const [usercurrent, setUsercurrent] = useState({});
    const [name, setName] = useState(userchosen?.ten)
    const isCurrentUser = route.params?.user.soDienThoai === useSelector(state => state.users.soDienThoai);
    const [doiAvatar, setDoiAvatar] = useState(false)
    const [isDoiAvatar, setIsDoiAvatar] = useState(false)
    const [isketBan, setIsKetBan] = useState(false)

    const fetchStories = () => {
        fetch('http://localhost:3000/stories')
            .then(res => res.json()) 
            .then((stories1) => {
                if(stories1.length>0)
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
    const fetchCurrentChosen = () => {
        fetch(`http://localhost:3000/users?soDienThoai=${route.params?.user.soDienThoai}`)
        .then(res => res.json())
        .then((user) => { 
            if(user?.length>0) {
                setUserchosen(user[0])
                setName(user[0].ten)
                return user[0]
            }
        })
    }

    const refresh = () => {
        fetchStories(); 
        fetchPosts(); 
        fetchUsers();
        fetchTyms();
        fetchCurrentChosen();
    }

    useEffect(() => {
        refresh(); 
    }, [])

    useEffect(() => {
        fetch(`http://localhost:3000/users?soDienThoai=${soDienThoai}`)
        .then(res => res.json())
        .then((user) => { 
            if(user?.length>0)
            setUsercurrent(user[0])
        })
    }, [])
    const ItemPost = ({item}) => {
        const User = dsusers.find(user => user?.soDienThoai === item.user);
        let avatar;
        try {
            avatar = require(`../assets/stories/${User?.avatar}`)
        } catch (error) {
            avatar = require('../assets/avatar-fallback.png');
        }
        if(item.user !== userchosen?.soDienThoai) return null

        const [coTym, setCoTym] = useState(tyms.find((item2) => soDienThoai===item2.user && item.id === item2.postId))
        const [soLuongTym, setSoLuongTym]  = useState(tyms.reduce((result,item1) => item1.postId === item.id ? result + 1 : result , 0))
        return(
            <Pressable style={{marginBottom: 12, backgroundColor: '#fff', borderRadius: 8}}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                        <Avatar story="default" backgroundColor="PURPLE-BLUE" online={User?.status==='online'} size={48}
                            src={avatar}
                            style={{marginRight: 20}}
                            
                        />
                        <View>
                            <Text style={{fontSize: 18, fontWeight: 600}}>{userchosen?.ten}</Text>
                            <Text style={{fontSize: 16, color: '#666'}}>{formatCustomDate(item?.date)}</Text>
                        </View>
                    </View>

                    <Pressable onPress={() => {
                        setActionSheetVisible(true)
                        setPostChose(item)
                    }}>
                        <Icon icon="zi-more-horiz"/>
                    </Pressable>
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
                    {/* <Pressable style={{flexDirection: 'row', alignItems: 'center', paddingRight: 26}}>
                        <Icon icon="zi-chat"/>
                        <Text style={{marginLeft: 6}}>36</Text>
                    </Pressable> */}
                </View>
            </Pressable>
        )
    }
    let bgr; 
    try { 
        bgr = require(`../assets/stories/${userchosen?.background}`); 
    } catch (error) { 
        bgr = require('../assets/stories/28.jpg'); 
    }

    let avatar; 
    try { 
        avatar = require(`../assets/stories/${userchosen?.avatar}`); 
    } catch (error) { 
        avatar = require('../assets/avatar-fallback.png'); 
    }

    const BackButton = () => {
        return(
        <View style={{position: 'absolute', top: 0, left: 0, zIndex: 10, width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.2)', padding: 12}}>
            <Pressable 
                onPress={() => {
                    if(route.params?.setIsActive){
                        if(route.params?.setIsActive)
                            route.params?.setIsActive(true)
                    }
                    navigation.goBack({params: {...route.params}}); 
                    
                }}>

                <Icon icon='zi-arrow-left' style={{color: '#fff', fontSize: 36}}/>
            </Pressable>

        </View>
        
        )
    }

    return (
        <View style={{height : '100%'}}>
            <BackButton/>
            <ScrollView >
                    {/* <Pressable onPress={() => {
                        if(route.params?.setIsActive){
                            if(route.params?.setIsActive)
                                route.params?.setIsActive(true)
                        }
                        navigation.goBack(); 
                    }}
                        style={{position: 'absolute', top: 20, left: 20, zIndex: 10}}>
                        <Icon icon='zi-arrow-left' style={{color: '#fff', fontSize: 36}}/>
                    </Pressable> */}
                    <View>
                        <Pressable onPress={ () => {
                                if(isCurrentUser) {
                                    setIsDoiAvatar(false); 
                                    setDoiAvatar(true)
                                }
                            }}>
                            <Image 
                                source={bgr}
                                style={{ width: '100vw', height: '50vh', backgroundColor: 'red', position: 'absolute', top: 0 }}
                            />
                        </Pressable>
                        <Pressable onPress={
                            () => {
                                if(isCurrentUser) {
                                    setIsDoiAvatar(true); 
                                    setDoiAvatar(true)
                                }
                            }
                        }>
                            <Avatar size={130}  src={avatar} online={userchosen?.status==='online'} story="default"
                                style={{alignSelf: 'center', top: 'calc(50vh - 80px)', position: 'absolute'}}
                            />
                        </Pressable>
                    </View>
                    <Text style={{alignSelf: 'center', top: 'calc(50vh + 55px)', fontSize: 18, fontWeight: 600}}> 
                        {userchosen.ten} 
                        {isCurrentUser && <Pressable onPress={() => { setModalVisible(true)}}>
                                            <Icon icon="zi-edit-text" style={{paddingLeft: 4}}/> 
                                        </Pressable>}
                    </Text >

                    <View style={{alignSelf: 'center', top: 'calc(50vh + 70px)', width: '100%', paddingHorizontal: 12}}>
                        { (!isCurrentUser) && <View style={{flexDirection: 'row', width: '100%'}}>
                            <Button prefixIcon={<Icon icon="zi-chat" />} variant="secondary" style={{width: '70%', marginLeft: 4, marginRight: 4}}>
                                Nhắn tin
                            </Button>
                            <Button prefixIcon={<Icon icon= {isketBan ? "zi-close" : "zi-add-user"}  style={{fontSize: 28, color: isketBan ? "#DC1F18" : "#000"}}/>} variant="tertiary" type="neutral" style={{backgroundColor: '#fff', width: '30%', marginLeft: 4, marginRight: 4}}
                                onClick={() => {
                                    setIsKetBan(!isketBan); 
                                }}
                            >

                            </Button>
                        </View>}

                        { (isCurrentUser) && <Pressable style={{flexDirection: 'row', width: '100%', height: 50, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', marginVertical: 4, borderRadius: 8, paddingHorizontal: 10}}
                            onPress={() => {
                                navigation.navigate({name: 'Đăng bài', params: {fetchPosts}});
                            }}
                        >
                            <Text style={{color: '#666'}}>  Bạn đang nghĩ gì </Text>
                            <Icon icon="zi-photo-solid"  style={{color: '#8DC83C'}}/>
                        </Pressable>}
                        <View style={{marginTop: 16}}>
                            {posts.map((item) => {
                                return(<ItemPost key={item.id} item={item} />)
                            })}
                        </View>
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
                        text: usercurrent===usercurrent ? "Xóa" : "Sửa", 
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
            />

            <Sheet.Actions
                mask
                visible={doiAvatar}
                onClose={() => setDoiAvatar(false)}
                swipeToClose
                actions={[
                [
                    {
                        text: isDoiAvatar ? "Đổi avatar" : "Đổi ảnh bìa",
                        highLight: true,
                        onClick: () => {
                            setDoiAvatar(false);
                            navigation.navigate({
                                name: 'Chọn ảnh', 
                                params: {
                                    ...route.params,
                                    user:userchosen, 
                                    refresh, 
                                    screen: 'DangStory', 
                                    option: isDoiAvatar ? 'avatar' : 'background'
                                }
                            });
                        }
                    },
                    {
                        text:"Xem tin",
                        highLight: true,
                        onClick: () => {
                            setDoiAvatar(false);
                            const itemStory = stories.find((item) => item.user === userchosen.soDienThoai);
                            if(itemStory) {
                                navigation.navigate({
                                    name:'Story', 
                                    params: {item: itemStory}
                                })
                            }
                        }
                    },
                    {
                        text: "Hủy",
                        close: true,
                    }
                ],
 
                ]}
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
                            setPopupVisible(false);
                            setPostChose({});
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
            <Modal
                    visible={modalVisible}
                    title="Đổi tên"
                     
                    onClose={() => {
                    setModalVisible(false);
                    }}
                    zIndex={1200}
                    actions={[
                    {
                        text: "Lưu",
                        onClick: () => {
                            setModalVisible(false);
                            fetch('http://localhost:3000/users/' + usercurrent?.id, {
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    ten: name
                                }),
                            }).then(fetchCurrentChosen).then(()=> {
                                if(route.params?.setUser)
                                    route.params?.setUser(userchosen)
                            })
                        }
                    },
                    {
                        text: "Hủy",
                        highLight: true,
                        onClick: () => {
                            setModalVisible(false);
                            setName(usercurrent?.ten);
                        }
                    },
                ]}
            >
                <Input value={name} onChange={(e) => setName(e.target.value)} autoFocus></Input>
            </Modal>
            <ImageViewer
                onClose={() => setVisible(false)}
                activeIndex={activeIndex}
                images={images}
                visible={visible}
            />

            
        </View>
    );
};

export default TrangCaNhan;

const styles = StyleSheet.create({

    

});
