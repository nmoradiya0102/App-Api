import axios from "axios";
import React, { useRef, useState ,useEffect } from "react";
// import { useEffect } from "react";

const App = () => {
  const [data, setdata] = useState([]);
  const [update, setupdate] = useState({});

  const title = useRef();
  const author = useRef();

  const getData = () => {
    axios
      .get("http://localhost:3001/posts")
      .then((res) => {
      // console.log(res.data);
      setdata(res.data || []);
    });
  };

  const addData = () => {
    const result = {
      title: title.current.value,
      author: author.current.value,
    };

    console.log(result);

    axios
      .post("http://localhost:3001/posts", result)
      .then((res) => {
      // console.log(res.data);
      setdata([...data, res.data]);
    });
  };

  const deleteData = (id) => {
    console.log(id);

    axios
      .delete(`http://localhost:3001/posts/${id}`)
      .then(() => {
      //   getData();
      setdata(data.filter((e) => e.id !== id));
    });
  };

  const updateData = (id, ind) => {
    console.log(id, "id");
    console.log(ind, "index");

    const final = data[ind];
    console.log(final);
    setupdate(final);
  };

  const finalUpdate = (e) => {
    setupdate({ ...update, [e.target.name]: e.target.value });
  };

  const final = () => {
    console.log(update, "update");

    axios
    .put(`http://localhost:3001/posts/${update.id}`, update)
    .then((res) => {
      console.log(res.data, "update res");
      setdata([...data , update]);
      // getData();
      });
    };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <input type="text" name="title" ref={title}/>
      <input type="text" name="author" ref={author}/>
      <button onClick={addData}>add</button>
      <br />
      <input type="text" name="title" value={update.title} onChange={finalUpdate}/>
      <input type="text" name="author" value={update.author} onChange={finalUpdate}/>
      <button onClick={final}>update</button>
      <button>cancel</button>

      <div>
        {data?.map((val, ind) => {
          return (
            <div key={ind}>
              <h1>{val.id}</h1>
              <h2>{val.title}</h2>
              <h3>{val.author}</h3>
              <button onClick={() => deleteData(val.id)}>delete</button>
              <button onClick={() => updateData(val.id, ind)}>update</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
