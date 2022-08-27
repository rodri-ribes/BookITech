// import styled from "styled-components";


// export const NavbarContainer = styled.div`
//     width: 100%;
//     height: 9vh;
//     position: sticky;
//     top: 0;
//     z-index: 99;
//     background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
//     margin-bottom: 50px;
//     `;


// export const ContainerSearch = styled.div`
//     position: relative;
//     width: 1150px;
//     left: -150px;
//     @media screen and (max-width: 968px){
//         display: none;
//     }
// `;


// export const NavbarWrapper = styled.div`
//     margin: auto;
//     width: 100%;
//     max-width: 1300px;
//     height: 100%;
//     align-items: center;
//     display: flex;
//     justify-content: space-between;
//     @media screen and (max-width: 968px){
//         justify-content: flex-end;
//         margin-right: 1rem;
//     }
// `;

// export const IconLogo = styled.div`
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: flex-start;
//     align-items: center;
//     font-family: "Oswald";
//     font-size: 2rem;
//     color: #ebc88b;
//     width: 100%;
//     .navlink{
//         text-decoration: none;
//         color: #ebc88b;
//     }
//     @media screen and (max-width: 968px){
//         display: flex;
//     }
// `;


// export const Menu = styled.ul`
//     height: 100%;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     width: 700px;
//     @media screen and (max-width: 968px){
//         width: 100%;
//         height: 100vh;
//         position: absolute;
//         top: 70px;
//         left: ${({ click }) => (click ? 0 : "-100%")};
//         flex-direction: column;
//         transition: 0.5s all ease-in;
//         background-color: #1d363f;
//     }
//     `;

// export const MenuItem = styled.li`
//     height: 100%;
//     padding: 0.5rem 1.5rem;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     font-size: 1.2rem;
//     font-family: "Oswald";
//     font-weight: 400;
//     cursor: pointer;
    
//     &:hover{
//         background-color: #2c5263;
//         border-bottom: 0.3rem solid #102128;
//         transition: 0.4s ease-in;
//     }
    
//     @media screen and (max-width: 968px){
//         width: 100%;
//         height: 100px;
//         position: relative;
//         bottom: 100px;
//         margin: 1rem 0;
//         &:hover{
//             border-bottom: none
//         }
//     }
//     `;

// export const MenuItemLink = styled.div`
//     color: #ebc08b;
//     font-size: 1.5rem;
    
//     div{
//         display: flex;
//     }
    
//     div a{
//         text-decoration: none;
//         color: white;
//     }

//     svg{
//         display: none;
//     }
//     @media screen and (max-width: 968px){ 
//         width: 100%;
//         height: 100%;
//         font-size: 2.5rem;
//         display: flex;

//         svg{
//             display: flex;
//             margin-right: 1rem;
//             text-align: center;
//         }
//         div{
//             width: auto;
//             height: 100%;
//             align-items: center;
//         }
//     }
// `;

// export const IconLogoMovile = styled.div`
//     display: none;

//     @media screen and (max-width: 968px){
//         display: flex;
//         color: #ebebeb;
//         font-size: 2rem;
//         padding-right: 15px;
//         align-items: flex-start;
//         margin-left: 1rem;
//     }
// `;