<template>

   <div class="container">
     <div class="login" v-if="state.username === '' || state.username === null">
       <form @submit.prevent="login">
         <h1>VueChat</h1>
         <input type="text" placeholder="Your name" v-model="inputLogin">
         <button type="submit">login</button>
       </form>
     </div>
     <div class="chat" v-else>
          <header>
          <div class="header-user">
             <div class="user-icon">{{ firstLetter(state.username) }}</div>
             <h2>{{state.username}}</h2>
          </div>  
          <div class="header-logout" @click="logout">Logout</div>
          </header>
          <main>

            <div class="message-box" 
             :class="state.username === message.username && 'current-user'"
             v-for="message in state.messages" :key="message.id">
               <div class="user-icon"> {{ firstLetter(message.username) }}</div>
               <div class="message">
                  {{message.body}}
               </div>
               
            </div>
          
          </main>
          <footer>
          <form @submit.prevent="sendMessage">
            <input type="text" placeholder="write a message .." v-model="inputMessage" />
            <button type="submit">send</button>
            
          </form>
          </footer>
     </div>
   </div>

</template>

<script>
import {ref,reactive,onMounted} from "vue";
import db from "./db";
export default {

  setup() {
    const inputLogin = ref("");
    const inputMessage = ref("");
     
    const state = reactive({
      username:"",
      messages:[]
    })
    const login = () => {
      if(inputLogin.value !== "" || inputLogin.value !== null){
        state.username = inputLogin.value;
         inputLogin.value="";
      }
    };
    const logout = () => {
     
     state.username = "";
     
    };
    const firstLetter = username => {
      return username.charAt(0);
    }
   const sendMessage = () => {
      const messagesRef = db.database().ref("messages");

      if(inputMessage.value === "" || inputMessage.value === null){
        return;
      }
      const message = {
        username:state.username,
        body: inputMessage.value
      };
      messagesRef.push(message);
      inputMessage.value = "";

    };

    onMounted(() => {
       const messagesRef = db.database().ref("messages");
        messagesRef.on("value" , (snapshot)=>{
          const data = snapshot.val();
          let messages = []

          Object.keys(data).forEach(key => {
            messages.push({
              id:key,
              username:data[key].username,
              body:data[key].body,
            });
          });
          state.messages = messages;
        });
    });

    return {
      inputLogin,
      inputMessage,
      sendMessage,
      login,
      logout,
      firstLetter,
      state
    }
  }

};

</script>

<style>
*,
*:after,
*:before {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  font-family: sans-serif;
  width: 100vw;
  min-height: 95vh;
  overflow-x: hidden;

}

.container {
  margin: 5vh auto 0;
  min-height: 90vh;
  background-color: #545454;


  width: 320px;
  border-radius: 20px;
  box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.1);

  overflow: hidden;
}

.login {
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
}
.login form {
  width: 90%;
  background-color: #f1f0f4;
  border-radius: 20px;
  padding: 3rem 1rem;
  box-shadow: 1px 1px 6px rgba(31, 32, 61, 0.1);
  color: #5d5a72;
}
.login h1 {
  text-align: center;
  font-size: 1.5rem;

  margin-bottom: 1.5rem;
}
.login input {
  width: 100%;
  border-radius: 10rem;
  background-color: #fff;
}
.login button {
  display: block;
  width: 100%;
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
  margin-top: 1rem;
  background-color: #3c3c3c;
  cursor: pointer;
  border-radius: 10rem;
  padding: 0.5rem;
  border: none;
  outline: none;
  color: #fff;
  transition: all 0.3s;
}
.login button:hover {
  background-color: #0195c1;
}

input {
  background-color: #f3f4f6;
  border: none;
  outline: none;
  padding: 0.5rem 1rem;
}
.chat {
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  min-height: 90vh;
}

header {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #e7e6f0;
}
header h2 {
  font-size: 1.5rem;
}
.header-user {
  display: flex;
  align-items: center;
}
.user-icon {
  border-radius: 10rem;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 0.75rem;
}
.header-user .user-icon {
  background-color: #fff;
  color: #545454;
  margin-right: 0.5rem;
  font-weight: bold;
}
.header-logout {
  transition: all 0.3s;
  padding: 0.5rem;
  border-radius: 5px;
  cursor: pointer;
  color: #f5e1e1;
}
.header-logout:hover {
  background-color: #0195c1;

  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
}
.header-logout:active {
  background-color: #5d5a72;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
}
main {
  background-color: #fff;
  flex-grow: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  max-height: calc(90vh - 130px);
  overflow-y: auto;
}

main::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: transparent;
}

main::-webkit-scrollbar {
  width: 4px;
  background-color: transparent;
}

main::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: rgba(66, 69, 129, 0.3);
}

.message-box {
  max-width: 80%;
  display: flex;
  margin-bottom: 1rem;
  position: relative;
}

.message-box .message {
  background-color: #f1f0f5;
  color: #666380;
  padding: 0.5rem;
  border-radius: 7px;
}
.message-box .user-icon {
  background-color: #f1f0f5;
  color: #545454;

  flex-shrink: 0;
  margin-right: 0.5rem;
}
.message-box.current-user {
  align-self: flex-end;
}
.message-box.current-user .user-icon {
  background-color: #545454;
  color: #fff;
  order: 2;
  margin-right: 0;
  margin-left: 0.5rem;
}
.message-box.current-user .message {
  background-color: #3c3c3c;
  color: #ffffff;
}
footer {
  background: #fff;
}
footer form {
  background: #484848;
  padding: 1rem;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;

  display: flex;
}

footer button {
  border: none;
  outline: none;
  padding: 0.5rem 1rem;
  font-weight: bold;
  background: #3c3c3c;
  border-top-right-radius: 10rem;
  border-bottom-right-radius: 10rem;
  color: #fff;
  cursor: pointer;
}
footer button:hover {
  background: #0195c1;

}
footer input {
  flex-grow: 1;
  border-top-left-radius: 10rem;
  border-bottom-left-radius: 10rem;
}
</style>