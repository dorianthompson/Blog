import _ from 'lodash';
import jsonPlaceHolder from "../apis/jsonPlaceHolder";

export const fetchPostsAndUsers = () => {
    return async (dispatch, getState) => {
        await dispatch(fetchPosts());
        
        //lodash uniqueId and map function
        /*const userIds = _.uniq(_.map(getState().posts, 'userId'));
        userIds.forEach(id => dispatch(fetchUser(id)));*/

        //lodash chain function to combine the above commented out methods
        _.chain(getState().posts)
            .map('userId')
            .uniq()
            .forEach(id => dispatch(fetchUser(id)))
            .value();
    }
};

export const fetchPosts = () => {
    return async (dispatch) => {
        const response = await jsonPlaceHolder.get('/posts');

        dispatch({ 
            type: 'FETCH_POSTS',
            payload: response.data
        })
    }
};

export const fetchUser = (id) => {
    return async (dispatch) => {
        const response = await jsonPlaceHolder.get(`/users/${id}`);
    
        dispatch({
            type: 'FETCH_USER',
            payload: response.data
        })
    }
};

//memoized network request so we avoid making mutltiple request for the same user
/*const _fetchUser = _.memoize(async (id, dispatch) => {
    const response = await jsonPlaceHolder.get(`/users/${id}`);
    

        dispatch({
            type: 'FETCH_USER',
            payload: response.data
        })
});*/