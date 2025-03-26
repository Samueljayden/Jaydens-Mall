const Footer = () => {
    return (
        <div>
            <section class="row text-white bg-dark p-4">
                <div class="col-md-4">
                <h4 class="text-centre">About us</h4>
                <p>Jayden's Shopping Mall is East Africa’s Leading destination for shopping and leisure.</p>
                <p>Subscribe below to get some special email news, promotions, freebies and many more surprises. </p>
                </div>
            <div class="col-md-4">
               <h4 class="text-centre">Contact us</h4>
               <p>Jayden's Shopping Mall management office contacts Phone: 020-3746172/3 Mobile: 0113779458 Email: info@Jayden's shopping mall.co.ke</p>
               <form action="">
                  <input type="email" placeholder="enter your email" class="form-control"/><br/>
                  <textarea name="" id="" class="form-control" placeholder="leave a comment" rows="7"></textarea>
               </form>
            </div>

            <div class="col-md-4">
               <h4 class="text-center">Stay Connected</h4>
               <br/>
               <a href="https://facebook.com">
                  <img src="images/fb.png" alt=""/>
               </a>
               <a href="https://instagram.com">
                  <img src="images/in.png" alt=""/>
               </a> <br />
               <p class="text-light">Leading destination for shopping and leisure.</p>

            </div>

         </section>
          <footer class="text-white bg-dark text-centre p-2">
            <h5 class="text-center">© Developed  by Samuel.J &copy;2025. Manage and Maintained by Samuel Jayden . All Rights Reserved.</h5>
          </footer>
        </div>
    );
}
 
export default Footer;