import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Home.module.css';

const Home = () => {
  const [tweets, setTweets] = useState([]);
  const [newTweet, setNewTweet] = useState('');

  useEffect(() => {
    // json-sever
    const apiUrl = 'http://localhost:8000/tweets';

    // つぶやきデータを取得する関数
    const fetchTweets = async () => {
      try {
        const response = await axios.get(apiUrl);
        // id降順に並び替える(投稿が新しい順に並び替える)
        const sortedTweets = response.data.sort((a, b) => b.id - a.id);
        setTweets(sortedTweets);
      } catch (error) {
        console.error('Error fetching tweets:', error);
      }
    };
    
    // ロード時にツイートデータを取得
    fetchTweets();
  }, []);

  const handleNewTweetChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setNewTweet(event.target.value);
  };

  const handleAddTweet = async () => {
    try {
      // json-sever
      const apiUrl = 'http://localhost:8000/tweets';

      // 新しいツイートを作成
      const response = await axios.post(apiUrl, {
        body: newTweet,
        //idは空欄にして順次追加
      });

      // 新しいツイートを最後尾に追加
      setTweets([...tweets, response.data]);

      // 入力欄をクリア
      setNewTweet('');
    } catch (error) {
      console.error('Error adding tweet:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.header}>
          <p>ホーム</p>
          <div>
            <textarea
              rows="4"
             cols="50"
             placeholder="いまなにしてる？"
             value={newTweet}
             onChange={handleNewTweetChange}
            />
            <br />
            <button onClick={handleAddTweet}>ツイートする</button>
          </div>
        </div>
      </div>
      <div>
        <ul>
          {tweets.map((tweet) => (

            <li key={tweet.id}>{tweet.id}:{tweet.body}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;