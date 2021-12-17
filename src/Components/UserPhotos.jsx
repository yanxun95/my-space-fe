import "../css/userPhotos.css";

const UserPhotos = () => {
  return (
    <div className="user-photos-main-container ">
      <div className="user-photos-fcontainer">
        <span>Photos</span>
        <span>See All Photos</span>
      </div>
      <div className="user-photos-scontainer">
        <div className="user-photos-clist">
          <img
            src="https://marmotamaps.com/de/fx/wallpaper/download/faszinationen/Marmotamaps_Wallpaper_Berchtesgaden_Desktop_1920x1080.jpg"
            alt=""
            className="user-photos-list up-photo-tleft"
          />
          <img
            src="https://marmotamaps.com/de/fx/wallpaper/download/faszinationen/Marmotamaps_Wallpaper_Berchtesgaden_Desktop_1920x1080.jpg"
            alt=""
            className="user-photos-list"
          />
          <img
            src="https://marmotamaps.com/de/fx/wallpaper/download/faszinationen/Marmotamaps_Wallpaper_Berchtesgaden_Desktop_1920x1080.jpg"
            alt=""
            className="user-photos-list up-photo-tright"
          />
        </div>
        <div className="user-photos-clist">
          <img
            src="https://marmotamaps.com/de/fx/wallpaper/download/faszinationen/Marmotamaps_Wallpaper_Berchtesgaden_Desktop_1920x1080.jpg"
            alt=""
            className="user-photos-list"
          />
          <img
            src="https://marmotamaps.com/de/fx/wallpaper/download/faszinationen/Marmotamaps_Wallpaper_Berchtesgaden_Desktop_1920x1080.jpg"
            alt=""
            className="user-photos-list"
          />
          <img
            src="https://marmotamaps.com/de/fx/wallpaper/download/faszinationen/Marmotamaps_Wallpaper_Berchtesgaden_Desktop_1920x1080.jpg"
            alt=""
            className="user-photos-list"
          />
        </div>
        <div className="user-photos-clist">
          <img
            src="https://marmotamaps.com/de/fx/wallpaper/download/faszinationen/Marmotamaps_Wallpaper_Berchtesgaden_Desktop_1920x1080.jpg"
            alt=""
            className="user-photos-list up-photo-bleft"
          />
          <img
            src="https://marmotamaps.com/de/fx/wallpaper/download/faszinationen/Marmotamaps_Wallpaper_Berchtesgaden_Desktop_1920x1080.jpg"
            alt=""
            className="user-photos-list"
          />
          <img
            src="https://marmotamaps.com/de/fx/wallpaper/download/faszinationen/Marmotamaps_Wallpaper_Berchtesgaden_Desktop_1920x1080.jpg"
            alt=""
            className="user-photos-list up-photo-bright"
          />
        </div>
      </div>
    </div>
  );
};

export default UserPhotos;
