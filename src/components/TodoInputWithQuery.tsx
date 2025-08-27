import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";

const TodoInputWithQuery = () => {
  const [newTodo, setNewTodo] = useState<string>("");

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (text: string) => {
      // 여기서 실제로 서버에 새로운 할일을 추가하는 API 호출을 수행
      return new Promise<string>((resolve) => {
        setTimeout(() => {
          resolve(text);
        }, 1000);
      });
    },
    onSuccess: (data) => {
      setNewTodo("");
      console.log("할일이 성공적으로 추가되었습니다:", data);

      // 성공적으로 추가된 후에 할일 목록을 다시 가져오도록 설정
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
    onError: (error) => {
      console.error("할일 추가 중 오류 발생:", error);
    },
  });

  console.log("Todo Input 렌더링!");
  return (
    <div>
      <input
        type="text"
        value={newTodo}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setNewTodo(e.target.value)
        }
      />
      <button onClick={() => mutation.mutate(newTodo)}>추가</button>
    </div>
  );
};

export default TodoInputWithQuery;
