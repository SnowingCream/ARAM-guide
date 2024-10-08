import champion from "../asset/data_dragon/champion.json";

function ChampionSummary(props) {
  const src_location =
    "asset/img/champion/" + champion.data[props.name].image.full;
  return (
    <div>
      <img src={src_location} alt="championIcon" />
      <li class="list-group-item">
        {(props.kill + props.assist) / props.death}
      </li>
    </div>
  );
}

export default ChampionSummary;
