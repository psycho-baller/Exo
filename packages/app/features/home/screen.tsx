import { RefObject, useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";

import { api } from "@acme/api/utils/trpc"
import { PageWithNavFooter } from "../../shared/components/Footer/PageWithNavFooter";
import { QuestionCard } from "./QuestionCard";


// const FriendDropdown = () => {
//   const utils = api.useUtils();
//   const ADD_FRIEND = 'Add friend'
//   const [value, setValue] = useState<string>("");
//   const [isFocus, setIsFocus] = useState(false);
//   const friendsQuery = api.friend.all.useQuery();
//   const friendData = friendsQuery?.data?.map((friend) => {
//     return {label: friend.name, value: friend.name}
//   });
//   const [friends,setFriends] = useState([
//     { label: ADD_FRIEND, value: '+'},
//     ...friendData || [],
//   ]);
//   const [selectedFriend, setSelectedFriend, friendSearch, setFriendSearch] = useAddFriendStore((state) => [state.selectedFriend, state.setSelectedFriend, state.friendSearch, state.setFriendSearch]);

//   const {mutate,error} = api.friend.create.useMutation({
//     async onSuccess(data) {
//       await utils.friend.all.invalidate();
      
//       setSelectedFriend({name: friendSearch, id: Number(data.insertId)});
//       setFriendSearch("");
//     },
//   });

//   const handleDropdownChange = (item: typeof friends[0]) => {
//     const value = item.value
//     if (value === '+') {
//       setFriends([
//         ...friends,
//         { label: friendSearch, value: friendSearch },
//       ]);
//       mutate({
//         createdByUserId: 1,
//         name: friendSearch,
//         friendUserId: 0,
//       })
//       setValue(friendSearch);
//     } else {
//       setValue(value);
//     }
//     setIsFocus(false);
//   }

//   if (friendsQuery.isLoading) {
//     return <Text>Loading...</Text>;
//   }

//   return(
//     <View>
//       {/* {renderLabel()} */}
//       <Dropdown
//         // style={{
//         //   width: 300,
//         //   height: 50,
//         //   borderWidth: 1,
//         //   borderColor: 'black',
//         //   borderRadius: 5,
//         //   paddingLeft: 10,
//         //   paddingRight: 10,
//         //   backgroundColor: 'white',
//         //   // color: 'black',
//         //   marginBottom: 10,
//         //   marginTop: 10,
//         // }}
//         placeholderStyle={{
//           // color: 'black',
//         }}
//         selectedTextStyle={{
//           display: 'none',
//         }}
//         inputSearchStyle={{
//           display: 'none',
//         }}
//         iconStyle={{
//           display: 'none',
//         }}
//         data={friends}
//         search
//         maxHeight={300}
//         labelField="label"
//         valueField="value"
//         placeholder={!isFocus ? 'Select or add a friend' : ''}
//         searchPlaceholder="Search or add a friend"
//         value={value}
//         inverted={false}
//         onFocus={() => setIsFocus(true)}
//         onBlur={() => setIsFocus(false)}
//         onChange={handleDropdownChange}
//         renderInputSearch={(onSearch: (text:string) => void) => {
//           function handleSearchChange(text: string) {
//             setFriendSearch(text);
//             onSearch(text);
//           }
//           return (
//             <Input
//               placeholder="Search or add a friend"
//               onChangeText={handleSearchChange}
//               value={friendSearch}
//               // autoFocus={isFocus}
//             />
//           );
//         }}
//         searchQuery={(keyword: string, labelValue: string) => (
//           labelValue.includes(keyword) || labelValue === ADD_FRIEND
//         )}
//           // renderItem={}
//         // renderLeftIcon={() => (
//           // <AntDesign
//           //   style={styles.icon}
//           //   color={isFocus ? 'blue' : 'black'}
//           //   name="Safety"
//           //   size={20}
//           // />
//         // )}
//       />
//     </View>
//   );
// };

const Index = () => {
  // const { width, height } = Dimensions.get('window');
  const questionQuery = api.question.all.useQuery();


  return (
    <PageWithNavFooter>
      <FlashList
        data={questionQuery.data}
        estimatedItemSize={20}
        // ItemSeparatorComponent={() => <Separator />}
        renderItem={(p) => (
          <QuestionCard
            question={p.item}
          />
        )}
      />
    </PageWithNavFooter>
  );
};

export default Index;
