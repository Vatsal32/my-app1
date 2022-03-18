import React, {useEffect, useState} from "react";
import {
    Badge,
    Box, Divider,
    FormControl,
    IconButton, InputLabel,
    Menu,
    MenuItem,
    Select,
    SelectChangeEvent,
    Tab,
    Tabs,
    Typography
} from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import Item from './Item';
import Panel from "./Panel";

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const Rides = (props) => {
    const [value, setValue] = useState(0);
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [listCity, setListCity] = useState({});
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState({});
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [items, setItems] = useState([[], [], []]);
    let i = 0;

    async function getData() {
        return await fetch('/api/distance', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "GET"
        }).then(res => res.json()).then((res) => {
            const cityStates = {};
            const c = {"": 0};

            for (let i = 0; i < res.data[0].length; i++) {
                if (cityStates[res.data[0][i].state] === undefined) {
                    cityStates[res.data[0][i].state] = [];
                }
                cityStates[res.data[0][i].state].push(res.data[0][i].city);
                c[res.data[0][i].city] = res.data[0][i].origin_station_code;
            }

            for (let i = 0; i < res.data[1].length; i++) {
                if (cityStates[res.data[1][i].state] === undefined) {
                    cityStates[res.data[1][i].state] = [];
                }
                cityStates[res.data[1][i].state].push(res.data[1][i].city);
                c[res.data[1][i].city] = res.data[1][i].origin_station_code;
            }

            for (let i = 0; i < res.data[2].length; i++) {
                if (cityStates[res.data[2][i].state] === undefined) {
                    cityStates[res.data[2][i].state] = [];
                }
                cityStates[res.data[2][i].state].push(res.data[2][i].city);
                c[res.data[2][i].city] = res.data[2][i].origin_station_code;
            }

            setListCity(c);
            setStates(cityStates);

            setItems(res.data);
        });
    }

    useEffect(() => {
        getData().catch(console.log);
    }, []);

    const open = Boolean(anchorEl);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeCity = (event) => {
        setCity(event.target.value);
    };

    const handleChangeState = (event) => {
        setCities(states[event.target.value]);
        setState(event.target.value);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{px: 10, width: '100%', py: 3}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider', display: {md: 'flex'}}}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" indicatorColor={'secondary'}
                      textColor={'secondary'} sx={{flexGrow: 1}}>
                    <Tab label={<Badge badgeContent={items[0].length} color={"secondary"}>Nearest
                        Rides&ensp;&ensp;</Badge>} {...a11yProps(0)} />
                    <Tab label={<Badge badgeContent={items[1].length} color={"secondary"}>Upcoming
                        Rides&ensp;&ensp;</Badge>} {...a11yProps(1)} />
                    <Tab label={<Badge badgeContent={items[2].length} color={"secondary"}>Past
                        Rides&ensp;&ensp;</Badge>} {...a11yProps(2)} />
                </Tabs>

                <Box sx={{flexGrow: 0, display: 'flex', alignItems: 'center'}}>
                    <IconButton id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}>
                        <FilterListIcon/>
                    </IconButton>

                    <Typography component={'span'}> Filters</Typography>
                </Box>

                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <Typography component={'span'} variant={'body1'} sx={{px: 2, py: 1}}>
                        Filters
                    </Typography>

                    <Divider variant={'middle'} sx={{m: 1}}/>

                    <FormControl sx={{m: 1, minWidth: 80}}>
                        <InputLabel id="demo-simple-select-autowidth-label">City</InputLabel>
                        <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={city}
                            onChange={handleChangeCity}
                            autoWidth
                            label="City"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {
                                cities.map((item) => (
                                        <MenuItem key={i++} value={item}>{item}</MenuItem>
                                    )
                                )
                            }
                        </Select>
                    </FormControl>
                    <FormControl sx={{m: 1, minWidth: 80}}>
                        <InputLabel id="demo-simple-select-autowidth-label">State</InputLabel>
                        <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={state}
                            onChange={handleChangeState}
                            autoWidth
                            label="State"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {
                                Object.keys(states).map((item) => (
                                    <MenuItem key={i++} value={item}>{item}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Menu>
            </Box>
                
            <TabPanel value={value} index={0}>
                <Panel items={items[0]} listCity={listCity} city={city} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Panel items={items[1]} listCity={listCity} city={city} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Panel items={items[2]} listCity={listCity} city={city} />
            </TabPanel>
        </Box>
    );
};

export default Rides;