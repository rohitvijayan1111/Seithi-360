import React from "react";
import Slider from "react-slick";
import AdComponent from "../AdComponent";

const AdGrid = () => {
  const ads = [
    {
      id: 1,
      title: "Discover Amazing Deals on Electronics!",
      description:
        "Explore top-rated gadgets and accessories, all at unbeatable prices. Don't miss out on exclusive offers. Hurry, limited-time deals available!",
      imageUrl:
        "https://i.pinimg.com/736x/f0/f9/e4/f0f9e45724771f16745ad3f6f640d3ce--shop-now-households.jpg",
    },
    {
      id: 2,
      title: "Get the Best Travel Packages!",
      description:
        "Book your dream vacation with our exclusive travel deals. Limited time offers available!",
      imageUrl:
        "https://th.bing.com/th/id/OIP.dbQZpcyyxX1SnPHFFSl3aQHaDQ?rs=1&pid=ImgDetMain",
    },
    {
      id: 3,
      title: "Upgrade Your Home with Smart Devices!",
      description:
        "Smart home devices at unbeatable prices. Transform your living space today!",
      imageUrl:
        "https://myventurepad.com/wp-content/uploads/2017/06/smarthome1.jpg",
    },
    {
      id: 4,
      title: "Fashion Sale: Up to 50% Off!",
      description:
        "Revamp your wardrobe with our latest fashion collection. Shop now and save big!",
      imageUrl:
        "https://th.bing.com/th/id/R.8f5b1996190745d7e284533f638dc651?rik=Z3fra0hEgIKo7Q&riu=http%3a%2f%2fonedollargraphics.com%2fwp-content%2fuploads%2fedd%2f2017%2f03%2fFashion-Clearance-Sale-Web-Banner-Ad-Designs-17-Sizes-768x427.png&ehk=CDQ6qLGysv%2fHiseqFPPPjUjC86X%2fuKqhhofz0%2fNawsM%3d&risl=&pid=ImgRaw&r=0",
    },

  ];


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="p-4">
      <Slider {...settings}>
        {ads.map((ad) => (
          <AdComponent key={ad.id} ad={ad} />
        ))}
      </Slider>
    </div>
  );
};

export default AdGrid;
