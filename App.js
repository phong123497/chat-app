import { useEffect, useState } from "react";
import "./App.css";
import { Auth } from "./components/Login/auth";
import { db, auth, storage } from "./config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
function App() {
  const [movieList, setMovieList] = useState([]);
  const moviesCollectioonRef = collection(db, "movies");
  let filteredData = [];
  // new movie states
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newRelesaseDate, setNewRelesaseDate] = useState(0);
  const [isNewReceived, setIsNewReceived] = useState(false);
  //update Ttitle state
  const [Title, setTitle] = useState("");

  //file upload state
  const [fileUpLoad, setFileUpLoad] = useState(null);

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectioonRef);
      filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (error) {}
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectioonRef, {
        title: newMovieTitle,
        releaseDate: newRelesaseDate,
        received: isNewReceived,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (error) {
      console.error(error);
    }
  };
  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
  };
  const updateTitle = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: Title });
  };
  const upLoadFile = async () => {
    if (!fileUpLoad) return;
    const filesFolderRef = ref(storage, `addFiles/${fileUpLoad.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpLoad);
    } catch (err) {
      // console.error(err);
    }
  };
  return (
    <div>
      <Auth />
      <div>
        <input
          placeholder="movie titile"
          onChange={(e) => {
            setNewMovieTitle(e.target.value);
          }}
        ></input>
        <input
          placeholder="release date"
          type="number"
          onChange={(e) => {
            setNewRelesaseDate(Number(e.target.value));
          }}
        ></input>
        <input
          type="checkbox"
          checked={isNewReceived}
          onChange={(e) => setIsNewReceived(e.target.checked)}
        ></input>
        <label>giai thuong</label>
        <button onClick={onSubmitMovie}>submit movie</button>
      </div>
      {movieList.map((movie, index) => (
        <div key={index}>
          <h1>{movie.title}</h1>
          <p>{movie.releaseDate}</p>
          <button onClick={() => deleteMovie(movie.id)}>Delete Moive</button>
          <input
            placeholder="newtitle"
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <button
            onClick={() => {
              updateTitle(movie.id);
            }}
          >
            Update Title
          </button>
        </div>
      ))}
      <div>
        <input
          type="file"
          onChange={(e) => {
            setFileUpLoad(e.target.files[0]);
          }}
        ></input>
        <button onClick={upLoadFile}> Upload File</button>
      </div>
    </div>
  );
}

export default App;
