import React, { useEffect, useState } from 'react';
import { useLazyQuery, gql} from '@apollo/client';
import { InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#e7e7de'
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
 
const Search = ({slugs}) => {
    const classes = useStyles();
    const [getData, result] = useLazyQuery(SEARCH_DATA)
    const[data, setData] = useState(null);

    const showSlug =(slug) => {
        getData({ variables: {slug: slug} })
    }

    useEffect(() => {
        if(result.data) {
            setData(result.data.findData)
        }
    }, [result])

    if(data) {
        console.log(data)
    }

    return (
      <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
    </div>

      )
    }

    const SEARCH_DATA = gql`
    query findDataBySlug($slug: String!) {
        findData(slug: $slug) {
            id
            slug
            name
            artistImage {
              url
            }
             albumsSongs {
                  ...on Album {
                    id
                    slug
                    albumName
                    albumImage {
                      url
                    }
                    songs {
                      id
                      slug
                      songTitle
                    }
                  }
                  ...on Song {
                    id
                    slug
                    songTitle
                    songFile {
                      url
                    }
                  }
                }
          }
    }
    `;

export default Search;