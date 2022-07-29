export default function Redirect(props) {
  // const url = new URL(window.location);
  if (props.to === '') {
    location.hash = '#';
  } else {
    location.hash = '#' + props.to;
  }
  // window.location.replace(url);
  return null;
}
