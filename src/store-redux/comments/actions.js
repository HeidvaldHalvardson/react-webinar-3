import simplifyErrors from "../../utils/simplify-errors";

const LIMIT_COMMENTS = 100

export default {
  load: id => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/load-start'})

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?${new URLSearchParams({
            'search[parent]': id,
            fields: 'items(_id,text,dateCreate,parent,author(profile(name))),count',
            limit: LIMIT_COMMENTS
          })}`
        })

        if (!res.data.error) {
          dispatch({type: 'comments/load-success', payload: { data: res.data.result.items, count: res.data.result.count }});
        } else {
          dispatch({ type: 'comments/load-error', payload: { errors: simplifyErrors(res.data.error.data.issues) } });
        }

      } catch (e) {
        console.log(e)
      }
    }
  },

  send: (_id, text, _type = 'article') => {
    return async (dispatch, getState, services) => {
     try {
       const res = await services.api.request({
         method: 'POST',
         url: `/api/v1/comments?${new URLSearchParams({
           fields: '_id,text,dateCreate,parent(_id),author(profile(name))',
         })}`,
         body: JSON.stringify({
           text,
           parent: {
             _id,
             _type,
           }
         })
       })

       if (!res.data.error) {
          const currentState = getState().comments.data
         dispatch({type: 'comments/load-success', payload: { data: [...currentState, res.data.result], count: getState().comments.count + 1 } });
       } else {
         dispatch({ type: 'comments/load-error', payload: { errors: simplifyErrors(res.data.error.data.issues) } });
       }

     } catch (e) {
       console.log(e)
     }
    }
  }
}
