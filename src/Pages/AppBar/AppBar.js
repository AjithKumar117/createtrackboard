import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Popper from '@mui/material/Popper';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import DialogBox from "../DialogBox/DialogBox";
import 'react-toastify/dist/ReactToastify.css';

const Search = styled('div')(({ theme }) => ({
  position: 'relative', borderRadius: theme.shape.borderRadius, backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25), }, marginLeft: 0, width: '100%',
  [theme.breakpoints.up('sm')]: { marginLeft: theme.spacing(1), width: 'auto', }
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2), height: '100%', position: 'absolute', pointerEvents: 'none', display: 'flex',
  alignItems: 'center', justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0), paddingLeft: `calc(1em + ${theme.spacing(4)})`, transition: theme.transitions.create('width'), width: '100%',
    [theme.breakpoints.up('sm')]: { width: '12ch', '&:focus': { width: '20ch', } }
  }
}));

export default function Navibar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  const [searchResult, setsearchResult] = React.useState([]);
  const [Dialogopen, setDialogopen] = React.useState(false);
  const [DialogContent, setDialogContent] = React.useState(null);
  let CandidateData = props.searchVal ? props.searchVal : [];

  const onSearchData = (value) => {
    value ? setOpen(true) : setOpen(false);
    let filtered = CandidateData.map((ele, index) => {
      let val = ele.fullName.toLocaleLowerCase();
      value = value.toLocaleLowerCase();
      if (val.includes(value)) { return { ele, index } }
    })
    filtered = filtered.filter((ele) => { return typeof (ele) !== 'undefined' }); setsearchResult(filtered)
  }

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget); setOpen((prev) => placement !== newPlacement || !prev); setPlacement(newPlacement);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <DialogBox open={Dialogopen} Content={DialogContent}
        onClose={() => {
          setDialogopen(false);
          setDialogContent("")
        }} />
      <AppBar position="static" >
        <Toolbar > <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}></IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>Recruit Assessment Tracker</Typography>
          <Button onClick={handleClick('bottom-end')} >
            <Search >
              <SearchIconWrapper>
                <SearchIcon style={{ color: "white" }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder={open ? "Click to Close..." : "search By Name..."}
                style={{ color: "white" }} inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => { onSearchData(e.target.value) }} />
            </Search>
          </Button>
          <Popper open={searchResult.length > 0 ? open : false} anchorEl={anchorEl} placement={placement} transition keepMounted>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper>
                  <Typography sx={{ p: 2 }}>
                    {searchResult.map((val) => {
                      return (
                        <TableRow><TableCell align="left">Name :</TableCell><TableCell align="left">{val.ele.fullName}</TableCell><TableCell align="left"><Button style={{
                          color: "black",
                          fontSize: "9.5px",textDecoration:"underline",
                          backgroundColor: "white", marginLeft: "28px", cursor: "pointer",
                        }} onClick={() => {
                          setDialogopen(true);
                          setDialogContent(val.ele);
                        }}>View Details</Button></TableCell></TableRow>
                      )
                    })
                    }
                  </Typography>
                </Paper>
              </Fade>
            )}
          </Popper>
        </Toolbar>
      </AppBar>
    </Box>
  );
}