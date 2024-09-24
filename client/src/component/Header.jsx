import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Aram Guide</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Player Record</Nav.Link>
            <Nav.Link href="#link">Champion Build</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
  // return (
  //   <div class="container">
  //     <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
  //       <a
  //         href="/"
  //         class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
  //       >
  //         <span class="fs-4">ARAM Guide</span>
  //       </a>

  //       <ul class="nav nav-pills">
  //         <li class="nav-item">
  //           <a href="#" class="nav-link active" aria-current="page">
  //             Home
  //           </a>
  //         </li>
  //         <li class="nav-item">
  //           <a href="#" class="nav-link">
  //             Features
  //           </a>
  //         </li>
  //         <li class="nav-item">
  //           <a href="#" class="nav-link">
  //             Pricing
  //           </a>
  //         </li>
  //         <li class="nav-item">
  //           <a href="#" class="nav-link">
  //             FAQs
  //           </a>
  //         </li>
  //         <li class="nav-item">
  //           <a href="#" class="nav-link">
  //             About
  //           </a>
  //         </li>
  //       </ul>
  //     </header>
  //   </div>
  // <header class="p-3 text-bg-dark">
  //   <div class="container">
  //     <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
  //       <a
  //         href="/"
  //         class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
  //       >
  //         <svg
  //           class="bi me-2"
  //           width="40"
  //           height="32"
  //           role="img"
  //           aria-label="Bootstrap"
  //         >
  //           {/* <use xlink:href="#bootstrap"></use> */}
  //         </svg>
  //       </a>

  //       <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
  //         <li>
  //           <a href="#" class="nav-link px-2 text-secondary">
  //             Home
  //           </a>
  //         </li>
  //         <li>
  //           <a href="#" class="nav-link px-2 text-white">
  //             Features
  //           </a>
  //         </li>
  //         <li>
  //           <a href="#" class="nav-link px-2 text-white">
  //             Pricing
  //           </a>
  //         </li>
  //         <li>
  //           <a href="#" class="nav-link px-2 text-white">
  //             FAQs
  //           </a>
  //         </li>
  //         <li>
  //           <a href="#" class="nav-link px-2 text-white">
  //             About
  //           </a>
  //         </li>
  //       </ul>

  //       <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
  //         <input
  //           type="search"
  //           class="form-control form-control-dark text-bg-dark"
  //           placeholder="Search..."
  //           aria-label="Search"
  //         />
  //       </form>

  //       <div class="text-end">
  //         <button type="button" class="btn btn-outline-light me-2">
  //           Login
  //         </button>
  //         <button type="button" class="btn btn-warning">
  //           Sign-up
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // </header>
  // );
}

export default Header;
