

function setUser(userObj){
  return {type: "SET_USER", payload: userObj}
}

function addListing(listing) {
  return {type: "ADD_LISTING", payload: listing}
}

function addToAllListing(listing){
  return {type: "ADD_TO_ALL_LISTINGS", payload:listing}
}

function editListing(listing) {
  return {type: "EDIT_LISTING", payload: listing}
}

function deleteListing(listing){
  return {type: "DELETE_LISTING", payload: listing}
}

function deleteCase(caseObj){
  return {type: "DELETE_CASE", payload: caseObj}
}

function addCase(caseObj) {
  return {type: "ADD_CASE", payload: caseObj}
}

function editCase(caseObj) {
  return {type: "EDIT_CASE", payload: caseObj}
}

function loadListings(){
  return function(dispatch){
    return fetch(`http://localhost:3000/listings`)
    .then(res => res.json())
    .then(data => {
      dispatch({type: "LOAD_LISTINGS", payload: data})
    })
  }
}

function loadCases(){
  return function(dispatch){
    return fetch(`http://localhost:3000/cases`)
    .then(res => res.json())
    .then(data => {
      dispatch({type: "LOAD_CASES", payload: data})
    })
  }
}

function approveOrCancelPlacement(updatedPlacement){
  return {type: "APPROVE_OR_CANCEL_PLACEMENT", payload: updatedPlacement}
}

function logout(){
  return {type: "LOGOUT"}
}

function addPlacementToCase(placement){
  return {type: "UPDATE_PLACEMENT", payload: placement}
}

function setCase(caseObj){
  return {type: "SET_CASE", payload: caseObj}
}

function resetCase(){
  return {type: "RESET_CASE"}
}

function checkPlacement(placement){
  return {type: "CHECK_PLACEMENT", payload: placement}
}

function toggleLoad(){
  return {type: "TOGGLE_LOAD"}
}

function setConversation(conversation){
  return {type: "SET_CONVERSATION", payload: conversation}
}

function newMessage(message){
  return {type: "NEW_MESSAGE", payload: message}
}

function updateReadMessages(conversation){
  return {type: "UPDATE_READ_MESSAGES", payload: conversation}
}

export {
  setUser,
  addListing,
  addToAllListing,
  editListing,
  addCase,
  deleteListing,
  deleteCase,
  editCase,
  loadListings,
  loadCases,
  approveOrCancelPlacement,
  logout,
  addPlacementToCase,
  setCase,
  resetCase,
  checkPlacement,
  toggleLoad,
  setConversation,
  newMessage,
  updateReadMessages
}
