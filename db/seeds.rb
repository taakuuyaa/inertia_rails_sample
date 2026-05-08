user = User.find_or_create_by!(email_address: "demo@example.com") do |u|
  u.password = "password"
  u.password_confirmation = "password"
end

tag_names = %w[ tech essay novel design ]
tags = tag_names.map { |name| user.tags.find_or_create_by!(name: name) }

samples = [
  { title: "達人プログラマー", author: "Andrew Hunt / David Thomas", rating: 5,
    memo: "DRYの原則と直交性。プロとしての心構え。", tag_names: %w[tech] },
  { title: "リーダブルコード", author: "Dustin Boswell", rating: 4,
    memo: "命名と整形の小さな積み重ねが、可読性に効く。", tag_names: %w[tech] },
  { title: "敗者のゲーム", author: "Charles D. Ellis", rating: 4,
    memo: "勝つ努力ではなく、負けない仕組みを作る話。", tag_names: %w[essay] }
]

samples.each do |sample|
  note = user.notes.find_or_create_by!(title: sample[:title]) do |n|
    n.author = sample[:author]
    n.rating = sample[:rating]
    n.memo = sample[:memo]
  end
  note.tags = tags.select { |t| sample[:tag_names].include?(t.name) }
end
