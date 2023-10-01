"use client";
export default function Error(props) {
  console.log(props);
  return (
    <div>
      오류가 발생했습니다 😢
      <br />
      잠시뒤에 다시 시도해주세요
    </div>
  );
}
