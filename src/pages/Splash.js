import logo from '../images/content/logo.png'

function Splash() {
  return (
    <section>
      <div class="container mx-auto min-h-screen">
        <div class="flex flex-col items-center justify-center h-screen">
          <div class="w-full md:w-4/12 text-center">
            <img
              src={logo}
              alt="Luxspace | Fulfill your house with beautiful furniture"
              class="mx-auto mb-8"
            />
            <p class="mb-16 px-4">
              Kami menyediakan furniture berkelas yang membuat ruangan terasa
              homey
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Splash;
