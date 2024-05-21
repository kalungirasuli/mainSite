import PostCard from "../microcomponents/PostCard"

export default function Home() {
    return (
        <>
        <div className="post w-full">
            <PostCard Profilesrc='../../../public/images/doctor.png' videoSrc='../../../public/videos/hello.mp4'  author='Kalungi Rasuli' role='doctor' time='1m' following='true' text='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio libero voluptates quia a quo saepe natus perspiciatis totam assumenda molestias distinctio, id vero architecto nulla. Molestiae quis earum saepe illum. Esse accusantium provident aliquid odio est, mollitia hic, at possimus deleniti voluptate id, quas eius voluptas ut placeat et? Maxime ab maiores laboriosam non, facilis commodi iusto dolores ex tempore porro. Assumenda rerum qui autem, alias id delectus ad illo architecto iure accusantium sit dignissimos dicta maiores accusamus dolore nam a rem provident expedita explicabo odit ipsum nemo. Fuga impedit, nulla ut earum quidem maxime quos dolor facere quo ducimus.' file={true} fileType='video' videoType='video/mp4'/> 
            {/* https://picsum.photos/seed/picsum/200/300 */}
        </div>
        </>
    )}