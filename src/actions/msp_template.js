const generateMSP = (array, reducer) => {
  return function(state){
      let obj = {}
      for (let i=0; i < array.length; i++){
		if (reducer){
			obj[array[i]] = state[reducer][array[i]]
		} else {
			obj[array[i]] = state[array[i]]
		}
      }
      return obj
  }
}

export {generateMSP}
