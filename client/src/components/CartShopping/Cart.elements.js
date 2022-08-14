import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 3rem;
    div{
        position: relative;
        p{
            position: absolute;
            right: 0;
            top: 30px;
            background-color: white;
            padding: 0 0.3rem;
            border-radius: 50%;
            color: black;
            font-weight: 600;
        }
    }
    
    svg{
        font-size: 2.8rem;
        cursor: pointer;
    }
`;
export const ContainerPanel = styled.div`
    /* display: flex; */
    display: ${({ click }) => (click ? "flex" : "none")};
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    min-height: 200px;
    width: 400px;
    height: 300px;
    padding: 0.5rem;
    overflow-y: auto;
    background-color: white;
    border-radius: 3px;
    position: absolute;
    right: 90px;
    top: 80px;
    background-color: #0a1929;
    box-shadow: 0px 0px 15px black;
    ::-webkit-scrollbar{
        width: 10px;
    }
    ::-webkit-scrollbar-track{
        background: white;
    }
    ::-webkit-scrollbar-thumb{
        background: red;
        border-radius: 5px;
    }

    @media screen and (max-width: 968px){
        position: absolute;
        right: 20px;
        top: 90px;
        width: 90%;
    }
`;

export const ContainerCash = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem;
    button{
        padding: 10px 15px;
        border: none;
        background-color: #07CA62;
        border-radius: 3px;
        transition: all 1s;
        cursor: pointer;
        font-weight: 600;
    }

    button:hover{
        background-color: #039045;
        transform: translateY(-2px);
    }

`;

export const ContainerEmptyCart = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    svg{
        font-size: 2rem;
        margin-right: 0.5rem;
    }

    h3{
        font-family: lucida sans;
    }
`