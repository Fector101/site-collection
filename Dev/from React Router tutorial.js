// Last layout
// <>
//       <Routes >
//         <Route path="/" element={ <Homepage top_movies_data__={top_movies_data}/> }/>
//         {/* <Route path="/grimoire" element={ <Homepage top_movies_data__={top_movies_data}/> }/> */}
//         <Route path="/lists/*" element={<ListRoutes />} /> 
//         <Route path="*" element={ <NotFoundpage/>} />
//       </Routes>
//     </>



// import { Route, Routes, useLocation } from "react-router-dom";

// function App() {
//     let location = useLocation()
//     console.log(location)
//     // let [top_10_movies,setTop10Movies]=useState([])
//     // useEffect(function(){
//     //   apiCall().then(data=>setTop10Movies(data))
//     // },[])
//     const saved_state = location.state
//     return (
//       <>
//         <p>{saved_state}</p>
//         <Routes>
//           <Route path="/" element={ <Homepage top_movies_data__={top_movies_data}/> }/>
//           <Route path="/lists/*" element={<ListRoutes />} /> 
//           <Route path="*" element={ <NotFoundpage/>} />
//         </Routes>
//       </>

//     )
// }  
// Sticky Routers Header
// {/* <Route path="/lists" element={<HeaderSticky />}> 
//   <Route index  element={ <Listspage text='Frm App Component to Route'/> } />
//   <Route path=":list_name" element={ <Listpage text='Frm App Component to Route'/> }/>
//   <Route path="new-list" element={ <CreateListpage text='Frm App Component to Route'/> }/>
// </Route> */}

// If UnRelated Path Share One Element
// {/* <Route element={<HeaderSticky />}> 
//   <Route index  element={ <Listspage text='Frm App Component to Route'/> } />
//   <Route path="some_path" element={ <Listpage text='Frm App Component to Route'/> }/>
//   <Route path="another-unrelated-path-using-same-head" element={ <CreateListpage text='Frm App Component to Route'/> }/>
// </Route>   */}

// return (
//   <Routes>
//     <Route path="/grimoire" element={ <Homepage top_movies_data__={top_movies_data}/> }/>
//     <Route path="/lists" element={ <Listspage text='Frm App Component to Route'/> }/>
//     <Route path="/lists/:list_name" element={ <Listpage text='Frm App Component to Route'/> }/>
//     <Route path="/lists/new-list" element={ <CreateListpage text='Frm App Component to Route'/> }/>
//     <Route path="*" element={ <NotFoundpage/>} />
//   </Routes>
//   // <div className="App">
//     // <Homepage top_movies_data__={top_movies_data}/>
//     // {/* <Homepage top_movies_data__={top_10_movies.results?.slice(0,7)}/> */}
//   // </div>
// )




// {/* <Routes>
// <Route path="/lists" element={<p>Some Side Bar With Same Route</p>} />
// </Routes>
// <Routes>
// <Route path="/grimoire" element={ <Homepage top_movies_data__={top_movies_data}/> }/>
// {/* <Route path="/lists/*" element={<ListRoutes />} /> 
// <Route path="*" element={ <NotFoundpage/>} /> */}
// </Routes> */}