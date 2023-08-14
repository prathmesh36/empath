import * as React from 'react';
import {useAuth} from "../auth/AuthProvider";
import {apiCall} from "../api/api";
import { YOUR_EXP_API_CONFIG} from "../metadata/apiConfig";
import {toast} from "react-toastify";
import Skeleton from "@mui/material/Skeleton";
import ExperienceModal from "./ExperienceModal";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import '../stylesheets/YourExp.css';
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import _ from "lodash";
import {Divider} from "@mui/material";
import {formatDate} from "../utility/utility";



export default function YourExp() {
    const [cards,setCards] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const { user, logout } = useAuth();

    React.useEffect(()=>{
        let authorizationHeader = {
            Authorization: `Bearer ${user.token}`,
            "ngrok-skip-browser-warning": "69420"
        }
        let apiConfig = _.cloneDeep(YOUR_EXP_API_CONFIG);
        apiConfig.url += user.user.userId;

        apiCall({...apiConfig, headers:authorizationHeader}, setCards, user.tokenExpiry)
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
                            Your Experiences
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            See all your experience here.
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
                                                            <Typography gutterBottom variant="h6" component="h6">
                                                               {card.expName}
                                                            </Typography>

                                                            <Typography >
                                                                {card.expDescription} - {card.expLocation}
                                                            </Typography>

                                                            <Divider sx={{margin:"10px 0px"}}/>

                                                            <Typography>
                                                                <Typography gutterBottom variant="h7" component="span" sx={{fontWeight:"800"}}>
                                                                    Order ID:
                                                                </Typography>
                                                                <Typography gutterBottom variant="h7" component="span">
                                                                    {" "}#{card.order.orderId}
                                                                </Typography>
                                                            </Typography>

                                                            <Typography>
                                                                <Typography gutterBottom variant="h7" component="span" sx={{fontWeight:"800"}}>
                                                                    Order Date:
                                                                </Typography>
                                                                <Typography gutterBottom variant="h7" component="span">
                                                                    {" "}{formatDate(card.order.createdTimestamp)}
                                                                </Typography>
                                                            </Typography>

                                                            <Typography>
                                                                <Typography className={"upcoming-exp-price"} variant="h4" component={"span"} sx={{color:"green"}}>
                                                                    ${card.expCost}
                                                                </Typography>
                                                                <Typography className={"upcoming-exp-price"} variant="h4" component={"span"}>
                                                                    {" "} x {" "}
                                                                </Typography>
                                                                <Typography className={"upcoming-exp-price"} variant="h4" component={"span"} sx={{color:"#438c89"}}>
                                                                    {card.order.totalQuantity}
                                                                </Typography>
                                                            </Typography>
                                                        </CardContent>
                                                        <CardActions>
                                                            <ExperienceModal card={card}/>
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
                                                        <WarningAmberIcon sx={{mb:"-5px"}} fontSize={"large"}/> No Your Experiences Found
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