# My-Music
Môn: Phát triển phần mềm hướng dịch vụ nhóm 01
Nhóm bài tập 02
Chủ đề: Xây dựng các ngân hàng về chủ để học TA.
Mô tả: Người dùng muốn học tiếng anh online với việc học theo từng chủ đề dựa vào chatGPT, người dùng nhập chủ đề cần tìm kiếm học và hệ thống sẽ gửi lại thông tin chủ đề cần cho người dùng: tiếng anh, tiếng việt, audio và thông báo đên email của khách hàng.
Bước 1: Phân rã quá trình thành các hoạt động chi tiết:
  Các bước của quá trình tìm kiếm chủ đề học tiếng anh: 
  -	Nhập đoạn chủ đề cần tìm.
  -	Nhận chủ đề tiếng anh cần tìm.
  -	Gửi chủ đề lên chatGPT
  -	Lấy đoạn nội dung chủ đề từ chatGPT
  -	Chia nhỏ đoạn nội dung chủ đề
  -	Lẫy mỗi đoạn nội dung chủ đề
  -	Các đoạn sẽ được gửi lên Google API.
  -	Nhận dữ liệu bao gồm: tiếng anh, tiếng việt, audio; liên quan đến đoạn nội dung và lưu vào Database
  -	Thông báo thành công hoặc thất bại.
  -	Hiện lên cho người dùng sử dụng.
  -	Lấy thông tin người dùng
  -	Gửi thông báo cho người dùng qua email.
Bước 2: Loại bỏ những hành động không cần thiết.
  -	Loại bỏ bước “Nhập đoạn chủ đề cần tìm” vì bước này người dùng cần nhập thủ công không thể tự động hóa.
  Các bước còn lại là: 
  -	Nhận chủ đề tiếng anh cần tìm.
  -	Gửi chủ đề lên chatGPT
  -	Lấy đoạn nội dung chủ đề từ chatGPT
  -	Chia nhỏ đoạn nội dung chủ đề
  -	Lẫy mỗi đoạn nội dung chủ đề
  -	Các đoạn sẽ được gửi lên Google API.
  -	Nhận dữ liệu bao gồm: tiếng anh, tiếng việt, audio; liên quan đến đoạn nội dung và lưu vào Database
  -	Thông báo thành công hoặc thất bại.
  -	Hiện lên cho người dùng sử dụng.
  -	Lấy thông tin người dùng
  -	Gửi thông báo cho người dùng qua email.
Bước 3: Xác định ứng viên dịch vụ thực thể:
  ![image](https://user-images.githubusercontent.com/87740670/228213182-3a30c9d3-afd9-4097-8e40-81268ce9e95e.png)
  Các bước được coi là không bất khả tri sẽ được in đậm bao gồm: 
  -	Nhận chủ đề tiếng anh cần tìm.
  -	Gửi chủ đề lên chatGPT
  -	Lấy đoạn nội dung chủ đề từ chatGPT
  -	Chia nhỏ đoạn nội dung chủ đề
  -	Lẫy mỗi đoạn nội dung chủ đề
  -	Các đoạn sẽ được gửi lên Google API.
  -	Nhận dữ liệu bao gồm: tiếng anh, tiếng việt, audio; liên quan đến đoạn nội dung và lưu vào Database
  -	Thông báo thành công hoặc thất bại.
  -	Hiện lên cho người dùng sử dụng.
  -	Lấy thông tin người dùng
  -	Gửi thông báo cho người dùng qua email.
  Ta có các ứng viên sau:
  ![image](https://user-images.githubusercontent.com/87740670/228213276-8432f038-108e-469a-a18b-72050eeecbbd.png)
  ![image](https://user-images.githubusercontent.com/87740670/228213294-db3c28af-56ff-467a-bffc-590b51f3bacd.png)
  ![image](https://user-images.githubusercontent.com/87740670/228213323-80215cf7-ca8b-4329-b451-a0fe1c4f5da2.png)
 Bước 4: Xác định logic quy trình cụ thể:
  Các bước được coi là không bất khả tri:
  -	Khởi tạo
  -	Nhận chủ đề tiếng anh cần tìm.
  -	Gửi chủ đề lên chatGPT
  -	Các đoạn sẽ được gửi lên Google API.
  -	Hiện lên cho người dùng sử dụng.
  -	Gửi thông báo cho người dùng qua email.
  Hành động “Khởi tạo” đưuọc hình thành cơ sở của 1 ứng viên “ Timnoidungchudetienganh”: 
