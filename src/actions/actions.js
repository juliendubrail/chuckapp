export function jokeHasErrored(bool) {
    return {
        type: 'JOKE_HAS_ERRORED',
        hasErrored: bool 
    }
}

export function jokeIsLoading(bool) {
    return {
        type: 'JOKE_IS_LOADING',
        isLoading: bool
    }
}

export function jokeFetchDataSuccess (joke) {
    return {
        type: 'JOKE_FETCH_DATA_SUCCESS',
        joke
    }
}

export function jokeFetchData(url) {
    return (dispatch) => {
        dispatch(jokeIsLoading(true));

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(jokeIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((joke) => dispatch(jokeFetchDataSuccess(joke)))
            .catch(() => dispatch(jokeHasErrored(true)));
    };
}


