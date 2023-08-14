import { useState} from "react";
import { Container, ButtonGroup, Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import '../stylesheets/CounterInput.css';

const StyledButton = styled(Button)(({ theme }) => ({

}));

const StyledInput = styled(TextField)({
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderRadius: 0,
            borderColor: blueGrey[200]
        },
        "&:hover fieldset": {
            borderColor: blueGrey[300]
        },
        "&.Mui-focused fieldset": {
            borderColor: blueGrey[500]
        },
        "& input": {
            textAlign: "center",
            width: 60,
            color: blueGrey[700]
        }
    }
});

export default function CounterInput({availableQuantity, addSelectedQuantity, index}) {
    const [count, setCount] = useState(1);
    const handleChange = (value) => {
        setCount(Math.min(Number(value), availableQuantity));
        addSelectedQuantity(Number(value),index)
    };

    return (
        <Container className={"counter-input-top-container"}>
            <ButtonGroup>
                <StyledButton
                    onClick={()=>{ handleChange(count - 1) }}
                    disabled={count === 1}
                >
                    <RemoveIcon fontSize="small" />
                </StyledButton>
                <StyledInput size="small" value={count} disabled/>
                <StyledButton onClick={()=>{ handleChange(count + 1) }}>
                    <AddIcon fontSize="small" />
                </StyledButton>
            </ButtonGroup>
        </Container>
    );
}
