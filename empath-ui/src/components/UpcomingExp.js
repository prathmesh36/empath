import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {apiCall} from "../api/api";
import { toast } from 'react-toastify';
import {UPCOMING_EXP_API_CONFIG} from "../metadata/apiConfig";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Skeleton from '@mui/material/Skeleton';
import ExperienceModal from "./ExperienceModal";
import '../stylesheets/UpcomingExp.css';
import {useAuth} from "../auth/AuthProvider";
import {useNavigate} from "react-router-dom";
import CounterInput from "./CounterInput";
import _ from "lodash";



export default function UpcomingExp() {
    const [cards,setCards] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    React.useEffect(()=>{
        let authorizationHeader = {
            Authorization: `Bearer ${user.token}`,
            "ngrok-skip-browser-warning": "69420"
        }
        apiCall({...UPCOMING_EXP_API_CONFIG, headers:authorizationHeader}, setCards, user.tokenExpiry)
            .then((response)=> {
                console.debug(response);
                setLoading(true);
                if(!response[0]){
                    toast.error("Message: " + response[3] + " Reason: " + response[2]);
                    setCards([]);
                }
            }
            ).catch((error) => {
                    toast.error("Message: " + error[3] + " Reason: " + error[2]);
                    if(error[1] === -1) {
                        logout();
                    }
                }
            );

    },[]);

    const addSelectedQuantity = (quantity, index)=>{
        if(cards[index]){
            let tempCards = _.cloneDeep(cards);
            tempCards[index]["expSelectedQuantity"] = quantity;
            console.debug(tempCards);
            setCards(tempCards);
        }
    }

    return (
        <>
            <main>
                <Box
                    sx={{
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Upcoming Experiences
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            We have a huge catalogue of experiences at Empath for you.
                            Something short and leading about the collection below—its contents,
                            the creator, etc. Make it short and sweet, but not too short so folks
                            don&apos;t simply skip over it entirely.
                        </Typography>
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                        </Stack>
                    </Container>
                </Box>
                <Container maxWidth="lg">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {
                            ( (!loading) ?
                                (
                                    Array.from(new Array(3))).map((item, index) => (
                                        <Grid  key={index + "-skeleton"} item  xs={12} sm={6} md={4}>
                                            <Box sx={{ width: 350, marginRight: 5, my: 5 }}>
                                                <Skeleton variant="rectangular"  width={350} height={118} />
                                                <Box sx={{ pt: 0.5 }}>
                                                    <Skeleton />
                                                    <Skeleton width="60%" />
                                                </Box>
                                            </Box>
                                        </Grid>
                                    )
                                )
                                :
                                ((Array.isArray(cards) && cards.length > 0) ?
                                    cards.map((card, index) => (
                                        <Grid item key={index + "-experience"} xs={12} sm={6} md={4}>
                                            <Card
                                                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                            >
                                                <CardMedia
                                                    component="div"
                                                    sx={{
                                                        // 16:9
                                                        pt: '100%',
                                                    }}
                                                    image={card.expPhotoUrl}
                                                />
                                                <CardContent sx={{ flexGrow: 1, pb:0 }}>
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        {card.expName}
                                                    </Typography>
                                                    <Typography>
                                                        {card.expDescription} - {card.expLocation}
                                                    </Typography>
                                                    <Typography className={"upcoming-exp-price"} variant="h6" >
                                                        Stock: {card.expQuantity} pcs.
                                                    </Typography>
                                                    <Typography className={"upcoming-exp-price"} variant="h4" sx={{color:"green"}}>
                                                        ${card.expCost}
                                                    </Typography>
                                                    <CounterInput index={index} availableQuantity={card.expQuantity} addSelectedQuantity={addSelectedQuantity}/>
                                                </CardContent>
                                                <CardActions sx={{marginLeft:"10px"}}>
                                                    <ExperienceModal card={card}/>
                                                    <Button variant="contained"  onClick={()=>{navigate("/check-out", {state:{card:card}})}} color="success">Buy</Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))
                                    :
                                    (
                                        <Grid item key={"Not Found Grid"} xs={12} sm={12} md={12}>
                                            <Typography
                                            component="h1"
                                            variant="h4"
                                            align="center"
                                            color="text.primary"
                                            gutterBottom>
                                                <WarningAmberIcon sx={{mb:"-5px"}} fontSize={"large"}/> No Upcoming Experiences Found
                                            </Typography>
                                        </Grid>
                                    )
                                )
                            )
                        }
                    </Grid>
                </Container>
            </main>
            {/* Footer */}
            <Box sx={{p: 6 }} component="footer" className={"experience-footer"}>
                <Typography variant="h6" align="center" gutterBottom>
                    Become an Insider
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    Subscribe to our newsletter to get notified on new experiences.
                </Typography>
            </Box>
            {/* End footer */}
        </>
    );
}