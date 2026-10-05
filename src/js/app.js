// ===== UTILITY =====
function show503() {
  const el = document.getElementById('overlay503');
  el.style.display = 'flex';
}
function close503() {
  document.getElementById('overlay503').style.display = 'none';
}

// ===== ESCAPE OVERLAY =====
function triggerEscape() {
  document.getElementById('escapeOverlay').classList.add('active');
}
function closeEscape() {
  document.getElementById('escapeOverlay').classList.remove('active');
}

// ===== BOSS SCREEN =====
function showBossScreen() {
  const el = document.getElementById('bossOverlay');
  el.style.display = 'flex';
  generateExcelTable();
}
function closeBossScreen() {
  document.getElementById('bossOverlay').style.display = 'none';
}

function generateExcelTable() {
  const table = document.getElementById('excelTable');
  const headers = ['','A','B','C','D','E','F','G','H','I','J','K','L'];
  const colHeaders = ['部門','Q1予算','Q2予算','Q3予算','Q4予算','合計','前年比','備考','承認者','ステータス','優先度','リスク'];
  const depts = ['営業本部','マーケ部','IT推進部','人事部','経理部','総務部','開発部','QA部','CS部','法務部','広報部','役員室'];
  const statuses = ['承認待ち','レビュー中','要修正','保留','却下','承認済','差し戻し'];
  const priorities = ['🔴高','🟡中','🟢低'];
  let html = '<thead><tr>';
  headers.forEach(h => html += `<th>${h}</th>`);
  html += '</tr><tr><th></th>';
  colHeaders.forEach(c => html += `<th>${c}</th>`);
  html += '</tr></thead><tbody>';
  for (let i = 0; i < 20; i++) {
    const dept = depts[i % depts.length];
    const q1 = Math.floor(Math.random()*9000000+1000000);
    const q2 = Math.floor(Math.random()*9000000+1000000);
    const q3 = Math.floor(Math.random()*9000000+1000000);
    const q4 = Math.floor(Math.random()*9000000+1000000);
    const total = q1+q2+q3+q4;
    const yoy = (85+Math.random()*30).toFixed(1);
    const status = statuses[Math.floor(Math.random()*statuses.length)];
    const priority = priorities[Math.floor(Math.random()*priorities.length)];
    const isHighlight = i === 13; // row 14
    html += `<tr${isHighlight?' style="background:#fff2cc;"':''}>
      <th>${i+1}</th>
      <td>${dept}</td>
      <td style="text-align:right;">${q1.toLocaleString()}</td>
      <td style="text-align:right;">${q2.toLocaleString()}</td>
      <td style="text-align:right;">${q3.toLocaleString()}</td>
      <td style="text-align:right;">${q4.toLocaleString()}</td>
      <td style="text-align:right;font-weight:bold;">${total.toLocaleString()}</td>
      <td style="text-align:right;color:${parseFloat(yoy)>=100?'#27ae60':'#e74c3c'}">${yoy}%</td>
      <td style="font-size:0.7rem;color:#666;">要確認</td>
      <td>田中 部長</td>
      <td style="font-size:0.75rem;color:${status==='承認済'?'#27ae60':status==='却下'?'#e74c3c':'#f39c12'}">${status}</td>
      <td>${priority}</td>
      <td style="font-size:0.75rem;color:#e74c3c;">中</td>
    </tr>`;
  }
  html += '</tbody>';
  table.innerHTML = html;
}

// Keyboard shortcut for boss screen
document.addEventListener('keydown', function(e) {
  // Ctrl+B as "Ctrl+Boss"
  if (e.ctrlKey && e.key === 'b') {
    e.preventDefault();
    showBossScreen();
  }
  // Escape to close boss screen
  if (e.key === 'Escape') {
    closeBossScreen();
    closeEscape();
    close503();
    closeDogezaModal();
    closePricingModal();
    closeExcuseModal();
  }
});

// ===== DOGEZA SIMULATOR =====
function openDogezaModal() {
  const el = document.getElementById('dogezaModal');
  el.style.display = 'flex';
}
function closeDogezaModal() {
  document.getElementById('dogezaModal').style.display = 'none';
  document.getElementById('dogezaResult').innerHTML = '';
  document.getElementById('dogezaAngleDisplay').textContent = '-- °';
  document.getElementById('dogezaEmoji').textContent = '😶';
  document.getElementById('dogezaLabel').textContent = 'カメラを起動してください';
}

function startDogezaSim(angle) {
  const emoji = document.getElementById('dogezaEmoji');
  const angleDisplay = document.getElementById('dogezaAngleDisplay');
  const label = document.getElementById('dogezaLabel');
  const result = document.getElementById('dogezaResult');

  // Animate angle counting
  let current = 0;
  const target = angle + Math.floor(Math.random()*5);
  angleDisplay.textContent = '計測中...';
  emoji.textContent = '📡';

  const interval = setInterval(() => {
    current += 3;
    if (current >= target) {
      current = target;
      clearInterval(interval);
      showDogezaResult(current);
    }
    angleDisplay.textContent = current + '°';
  }, 30);

  function showDogezaResult(deg) {
    let rank, color, bgColor, msg, emojiChar;
    if (deg < 20) {
      rank = 'D ランク';
      color = '#e74c3c';
      bgColor = '#fdecea';
      msg = '「舐めてるのか」判定。会釈というより首の運動。再試行を強く推奨します。警告音：🔔🔔🔔';
      emojiChar = '😤';
    } else if (deg < 40) {
      rank = 'C ランク';
      color = '#f39c12';
      bgColor = '#fef9e7';
      msg = '平均的な謝罪。可もなく不可もなし。クライアント相手には不十分です。';
      emojiChar = '😬';
    } else if (deg < 60) {
      rank = 'A ランク 最敬礼合格 ✅';
      color = '#27ae60';
      bgColor = '#eafaf1';
      msg = '合格です。標準的な謝罪として認定されました。この角度を維持してください。';
      emojiChar = '🙇';
    } else if (deg < 85) {
      rank = 'S ランク 上級謝罪者';
      color = '#8e44ad';
      bgColor = '#f5eef8';
      msg = '素晴らしい謝罪角度です。相手の怒りは概ね75%抑制されると推定されます。';
      emojiChar = '🙇‍♂️';
    } else {
      rank = '🏆 SS ランク プロの詫び';
      color = '#d4ac0d';
      bgColor = '#fef9e7';
      msg = '土下座クラス認定。厳かなBGMをフェードインします... 🎵 あなたは今日から謝罪の神です。';
      emojiChar = '⛩️';
      playDogezaBGM();
    }
    emoji.textContent = emojiChar;
    label.textContent = rank;
    angleDisplay.style.color = color;
    result.style.background = bgColor;
    result.style.border = `2px solid ${color}`;
    result.style.padding = '12px';
    result.style.borderRadius = '8px';
    result.style.color = '#2c3e50';
    result.innerHTML = `<strong style="color:${color}">${rank}</strong><br>${msg}`;
  }
}

function playDogezaBGM() {
  // Web Audio API で厳かな音を生成
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [261.63, 329.63, 392.00, 349.23, 392.00, 440.00];
    let time = ctx.currentTime;
    notes.forEach(freq => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = 'sine';
      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(0.3, time + 0.1);
      gain.gain.linearRampToValueAtTime(0, time + 0.6);
      osc.start(time);
      osc.stop(time + 0.7);
      time += 0.5;
    });
  } catch(e) {}
}

// ===== EXCUSE ENGINE =====
const excuseDB = {
  1: {
    課長: [
      "電車の遅延ではなく、駅の階段で鳩の進路を譲っていたため遅れました。生命の尊重を優先した結果です。",
      "スマートフォンのバッテリーが気温変化により熱膨張し、モバイルSuicaが一時的に使用不能になりました。",
      "社内チャットの重要メッセージを見落としたのは、ダークモードと白文字の視認性コントラスト比がWCAGの基準を下回っていたためです。"
    ],
    部長: [
      "前日の業務集中により、概日リズムが乱れ、自律神経系のキャリブレーション中でした。",
      "資料の提出が遅れたのは、フォントのカーニングを調整することで可読性を最大化していたためです。",
      "ミーティングに5分遅れたのは、直前の会議で出た課題をシステム思考的に整理していたためです。"
    ],
    クライアント: [
      "納期の遅延は、品質ゲートを厳格に運用した結果であり、むしろご評価いただけると確信しております。",
      "仕様書の記載と実装の乖離については、ドキュメントのアンビギュイティを最小化する観点から再解釈した経緯がございます。",
      "パフォーマンスの低下は、セキュリティ強化とのトレードオフを慎重に検討した結果の設計判断でございます。"
    ],
    監査役: [
      "当該プロセスの逸脱は、アジャイル手法における反復的改善サイクルの一環として位置づけております。",
      "記録の不備については、ペーパーレス化推進の文脈における過渡的状況としてご理解いただけますと幸甚です。",
      "承認フローのショートカットは、意思決定速度の向上を目的とした業務効率化の実験的取り組みでございます。"
    ]
  },
  3: {
    課長: [
      "本事象は、マイクロサービス間の非同期通信における結果整合性モデルの誤認識に起因するものであり、個人の過失とは性質が異なります。",
      "テスト環境と本番環境の差異は、インフラのイミュータブル性が担保されていなかったアーキテクチャの構造的問題です。",
      "デプロイ後の不具合は、カナリアリリースの段階的ロールアウト比率の設計が最適化されていなかったことによる確率論的事象です。"
    ],
    部長: [
      "本インシデントは、技術的負債の複利的蓄積が閾値を超えた結果であり、経営判断としてのリファクタリング投資の先送りと因果関係があります。",
      "障害の根本原因は、レガシーシステムとの統合における仕様の暗黙知が形式知化されていなかった組織的知識管理の問題です。",
      "今回の事象については、モノリシックアーキテクチャに内在するカスケード障害リスクを事前に指摘していた技術評価レポート（未読）をご参照ください。"
    ],
    クライアント: [
      "本件は、昨今の地政学的リスクに起因するクラウドリージョンの不安定性が遠因となった不可抗力事象でございます。",
      "システムの応答遅延は、エンドユーザーの増加に伴うスケールアウトが想定を上回る速度で発生した、いわば成功起因の課題でございます。",
      "画面表示の不整合は、ブラウザのレンダリングエンジンのバージョン差異という、当社の制御範囲外の環境要因でございます。"
    ],
    監査役: [
      "当該データの不整合は、複数システム間でのトランザクション境界の設計に係る業界横断的な技術課題であり、ベストプラクティスが未確立の領域です。",
      "内部統制の観点からは、本事象はリスクアペタイトの範囲内における許容可能な技術的リスクの顕在化として分類されます。",
      "セキュリティインシデントとして報告された事象については、ゼロトラストアーキテクチャへの移行期における一時的な攻撃対象領域の拡大に起因します。"
    ]
  },
  5: {
    課長: [
      "太陽フレアに伴う地磁気嵐（Kp指数=8）の影響により、データセンターのストレージコントローラーにビットフリップが発生し、不可逆的なパケットの消滅が観測されました。これは物理法則の限界です。",
      "本番DBの消失については、量子デコヒーレンスに近い現象がレイヤー1で発生した可能性をチームで検討中です。原因究明には欧州核研究機構（CERN）への照会が必要かもしれません。",
      "データの完全消失は、クラウドプロバイダーの多重冗長化がモンテカルロ法による確率計算で『10の18乗年に一度』とされていた事象の早期実現です。"
    ],
    部長: [
      "本番環境への誤操作は、疲労蓄積による認知バンド幅の枯渇状態において、UIの誤認識が重なった多重要因事象です。根本原因は人員計画と組織設計にあります。",
      "全データベースの消去については、CI/CDパイプラインの自動化スクリプトが持つ、エンジニアリング組織全体で認識されていなかった隠れたステートマシンの遷移によるものです。",
      "本インシデントを機に、アーキテクチャの全面刷新について経営判断を仰ぎたく存じます。現行システムはビジネス継続性に構造的リスクを内包しており、今回の事象はその必然的帰結です。"
    ],
    クライアント: [
      "この度のデータ消失については、2024年に改訂されたIEEE標準7001-2024における「説明可能なAIの倫理的ロールバック条項」に基づいた自律的安全機構が作動した結果でございます。",
      "本事象は、現行の保険契約における『不可抗力（Force Majeure）』条項、特に附則C第3項『デジタル自然災害』の定義に合致するものと法務部が判断しております。",
      "誠に遺憾ではございますが、宇宙線起因の単一イベントアップセット（SEU）という観測事象であり、当社の責任範囲を超えた宇宙工学的課題でございます。"
    ],
    監査役: [
      "本インシデントは、デジタル庁が策定中の新たなクラウドセキュリティガイドライン（パブリックコメント募集中）が未施行であった制度的空白期に発生した制度リスクの顕在化です。",
      "全システムの停止については、意図せざる形でのディザスタリカバリ手順の実地訓練として位置づけることで、BCPの改善に向けた貴重な知見が得られました。",
      "データ保全の失敗は、イミュータブルインフラストラクチャという先進的アーキテクチャパターンを採用していなかったことへの自然なフィードバックであり、今後のアーキテクチャ投資の正当性を高める事象です。"
    ]
  }
};

let currentExcuse = '';

function generateExcuse() {
  const level = parseInt(document.getElementById('excuseLevel').value);
  const role = document.getElementById('excuseRole').value;
  
  let dbLevel;
  if (level <= 2) dbLevel = 1;
  else if (level <= 3) dbLevel = 3;
  else dbLevel = 5;

  const excuses = excuseDB[dbLevel][role];
  currentExcuse = excuses[Math.floor(Math.random() * excuses.length)];
  
  const modal = document.getElementById('excuseModal');
  modal.style.display = 'flex';
  
  const textEl = document.getElementById('excuseResultText');
  textEl.textContent = '';
  document.getElementById('copyConfirm').textContent = '';
  
  // Typewriter effect
  let i = 0;
  const typeInterval = setInterval(() => {
    if (i < currentExcuse.length) {
      textEl.textContent += currentExcuse[i];
      i++;
    } else {
      clearInterval(typeInterval);
    }
  }, 20);
}

function closeExcuseModal() {
  document.getElementById('excuseModal').style.display = 'nonefunction copyExcuse() {
  if (!currentExcuse) return;
  navigator.clipboard.writeText(currentExcuse).then(() => {
    document.getElementById('copyConfirm').textContent = '✅ クリップボードにコピーしました。ご活用ください。';
  }).catch(() => {
    document.getElementById('copyConfirm').textContent = '⚠️ コピーに失敗しました（手動でコピーしてください）';
  });
}

// ===== SECTION 2: Dogeza Simulator =====
let dogezaStream = null;
let dogezaInterval = null;
let currentAngle = 0;

async function startDogezaCamera() {
  const video = document.getElementById('dogezaVideo');
  const startBtn = document.getElementById('dogezaStartBtn');
  const stopBtn = document.getElementById('dogezaStopBtn');
  
  try {
    dogezaStream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = dogezaStream;
    video.style.display = 'block';
    document.getElementById('dogezaPlaceholder').style.display = 'none';
    startBtn.style.display = 'none';
    stopBtn.style.display = 'inline-block';
    startDogezaAnalysis();
  } catch (e) {
    // Camera not available - simulate mode
    video.style.display = 'none';
    document.getElementById('dogezaPlaceholder').style.display = 'none';
    document.getElementById('dogezaSimulateNotice').style.display = 'block';
    startBtn.style.display = 'none';
    stopBtn.style.display = 'inline-block';
    startDogezaAnalysis(true);
  }
}

function stopDogezaCamera() {
  if (dogezaStream) {
    dogezaStream.getTracks().forEach(t => t.stop());
    dogezaStream = null;
  }
  if (dogezaInterval) {
    clearInterval(dogezaInterval);
    dogezaInterval = null;
  }
  document.getElementById('dogezaVideo').style.display = 'none';
  document.getElementById('dogezaPlaceholder').style.display = 'flex';
  document.getElementById('dogezaSimulateNotice').style.display = 'none';
  document.getElementById('dogezaStartBtn').style.display = 'inline-block';
  document.getElementById('dogezaStopBtn').style.display = 'none';
  resetDogezaUI();
}

function startDogezaAnalysis(simulate = false) {
  dogezaInterval = setInterval(() => {
    // Simulate angle detection (random walk)
    const delta = (Math.random() - 0.48) * 8;
    currentAngle = Math.max(0, Math.min(90, currentAngle + delta));
    updateDogezaUI(currentAngle);
  }, 300);
}

function resetDogezaUI() {
  currentAngle = 0;
  document.getElementById('dogezaAngleValue').textContent = '0°';
  document.getElementById('dogezaAngleFill').style.width = '0%';
  document.getElementById('dogezaRank').textContent = '---';
  document.getElementById('dogezaComment').textContent = 'カメラを起動して謝罪姿勢を分析してください。';
  document.getElementById('dogezaRankBadge').className = 'dogeza-rank-badge';
  stopBGM();
}

function updateDogezaUI(angle) {
  document.getElementById('dogezaAngleValue').textContent = Math.round(angle) + '°';
  document.getElementById('dogezaAngleFill').style.width = Math.min(100, (angle / 90) * 100) + '%';
  
  const rankBadge = document.getElementById('dogezaRankBadge');
  const rankText = document.getElementById('dogezaRank');
  const comment = document.getElementById('dogezaComment');
  
  if (angle < 15) {
    rankBadge.className = 'dogeza-rank-badge rank-f';
    rankText.textContent = 'Fランク';
    comment.textContent = '⚠️ 警告：謝罪の意思がゼロです。むしろ喧嘩を売っています。';
    stopBGM();
  } else if (angle < 30) {
    rankBadge.className = 'dogeza-rank-badge rank-d';
    rankText.textContent = 'Dランク';
    comment.textContent = '🚨 「舐めてるのか」判定。会釈レベルです。もっと誠意を見せてください。';
    stopBGM();
  } else if (angle < 45) {
    rankBadge.className = 'dogeza-rank-badge rank-c';
    rankText.textContent = 'Cランク';
    comment.textContent = '📋 及第点。ただし「心がこもっていない」と言われる可能性があります。';
    stopBGM();
  } else if (angle < 65) {
    rankBadge.className = 'dogeza-rank-badge rank-a';
    rankText.textContent = 'Aランク';
    comment.textContent = '✅ 最敬礼（45度）達成！標準的な謝罪です。合格。';
    stopBGM();
  } else if (angle < 80) {
    rankBadge.className = 'dogeza-rank-badge rank-s';
    rankText.textContent = 'Sランク';
    comment.textContent = '🏆 深い謝罪を検知！「本気度」が伝わっています。';
    stopBGM();
  } else {
    rankBadge.className = 'dogeza-rank-badge rank-ss';
    rankText.textContent = 'SS・プロの詫び';
    comment.textContent = '👑 画面アウト・土下座クラスを検知！厳かなBGMをフェードインします…';
    playBGM();
  }
}

let bgmPlaying = false;
function playBGM() {
  if (bgmPlaying) return;
  bgmPlaying = true;
  document.getElementById('dogezaBGMOverlay').style.display = 'flex';
}

function stopBGM() {
  if (!bgmPlaying) return;
  bgmPlaying = false;
  document.getElementById('dogezaBGMOverlay').style.display = 'none';
}

// ===== SECTION 3: Boss Screen =====
let bossScreenActive = false;

function activateBossScreen() {
  bossScreenActive = true;
  document.getElementById('bossScreenOverlay').style.display = 'flex';
  // Auto-deactivate after 5s
  setTimeout(() => {
    deactivateBossScreen();
  }, 5000);
}

function deactivateBossScreen() {
  bossScreenActive = false;
  document.getElementById('bossScreenOverlay').style.display = 'none';
}

document.addEventListener('keydown', (e) => {
  // Ctrl + B as "Ctrl + Boss"
  if (e.ctrlKey && e.key === 'b') {
    e.preventDefault();
    activateBossScreen();
  }
  // ESC to close boss screen
  if (e.key === 'Escape' && bossScreenActive) {
    deactivateBossScreen();
  }
});

// ===== SECTION 4: Ghost PR =====
const ghostPRMessages = [
  "fix: 末尾の空白を削除",
  "chore: コメントの改行を統一",
  "style: インデントを半角スペース2つに修正",
  "docs: READMEの句点を修正",
  "refactor: 変数名のタイポを修正（未使用）",
  "test: テストの説明文の誤字を修正",
  "fix: ログ出力の改行コードをLFに統一",
  "chore: .gitignoreに.DS_Storeを追加（3回目）",
];

const ghostSlackMessages = [
  "🔥 本日もフルコミットで参ります",
  "💡 アーキテクチャの改善案を検討中です",
  "📊 KPIのモニタリング中です",
  "🚀 デプロイ準備を進めています",
  "🔍 パフォーマンス計測中です",
];

let ghostInterval = null;
let ghostRunning = false;

function toggleGhost() {
  if (ghostRunning) {
    stopGhost();
  } else {
    startGhost();
  }
}

function startGhost() {
  ghostRunning = true;
  document.getElementById('ghostToggleBtn').textContent = '⏹ ゴースト停止';
  document.getElementById('ghostToggleBtn').classList.add('active-ghost');
  document.getElementById('ghostStatus').textContent = '🟢 稼働中 - クラウドに「頑張ってる感」を送信しています';
  addGhostLog('🚀 カタカタゴーストを起動しました。');
  
  ghostInterval = setInterval(() => {
    const now = new Date();
    const hour = now.getHours();
    
    // Simulate random activity
    const action = Math.floor(Math.random() * 3);
    if (action === 0) {
      const msg = ghostPRMessages[Math.floor(Math.random() * ghostPRMessages.length)];
      addGhostLog(`📤 GitHub PR自動送信: "${msg}" - LGTM ✅`);
    } else if (action === 1) {
      const msg = ghostSlackMessages[Math.floor(Math.random() * ghostSlackMessages.length)];
      addGhostLog(`💬 Slackステータス更新: ${msg}`);
    } else {
      addGhostLog(`⌨️ キーボード入力をシミュレート中... (${Math.floor(Math.random()*200)+50} WPM)`);
    }
  }, 3000);
}

function stopGhost() {
  ghostRunning = false;
  if (ghostInterval) {
    clearInterval(ghostInterval);
    ghostInterval = null;
  }
  document.getElementById('ghostToggleBtn').textContent = '▶ ゴースト起動';
  document.getElementById('ghostToggleBtn').classList.remove('active-ghost');
  document.getElementById('ghostStatus').textContent = '⚫ 停止中';
  addGhostLog('🛑 カタカタゴーストを停止しました。お疲れ様でした。');
}

function addGhostLog(message) {
  const log = document.getElementById('ghostLog');
  const now = new Date();
  const timeStr = now.getHours().toString().padStart(2,'0') + ':' + 
                  now.getMinutes().toString().padStart(2,'0') + ':' + 
                  now.getSeconds().toString().padStart(2,'0');
  const entry = document.createElement('div');
  entry.className = 'ghost-log-entry';
  entry.textContent = `[${timeStr}] ${message}`;
  log.insertBefore(entry, log.firstChild);
  // Keep max 20 entries
  while (log.children.length > 20) {
    log.removeChild(log.lastChild);
  }
}

// ===== KPI Dashboard =====
function animateKPIs() {
  const kpiElements = document.querySelectorAll('.kpi-value[data-target]');
  kpiElements.forEach(el => {
    const target = parseFloat(el.getAttribute('data-target'));
    const isPercent = el.getAttribute('data-suffix') === '%';
    const suffix = el.getAttribute('data-suffix') || '';
    let current = 0;
    const step = target / 60;
    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = (Number.isInteger(target) ? Math.round(current) : current.toFixed(1)) + suffix;
      if (current >= target) clearInterval(interval);
    }, 30);
  });
}

// ===== Monday 503 =====
function checkMondayMorning() {
  const now = new Date();
  const day = now.getDay(); // 0=Sun, 1=Mon
  const hour = now.getHours();
  if (day === 1 && hour >= 9 && hour < 10) {
    document.getElementById('mondayOverlay').style.display = 'flex';
  }
}

function dismissMonday() {
  document.getElementById('mondayOverlay').style.display = 'none';
}

// ===== Emergency Button =====
function emergencyEscape() {
  const btn = document.getElementById('emergencyBtn');
  btn.textContent = '💨 逃走中...';
  btn.style.background = '#888';
  
  // Show confirmation
  document.getElementById('emergencyModal').style.display = 'flex';
  
  setTimeout(() => {
    btn.textContent = '🚨 緊急脱出';
    btn.style.background = '';
  }, 3000);
}

function closeEmergencyModal() {
  document.getElementById('emergencyModal').style.display = 'none';
}

// ===== Navigation =====
function showSection(sectionId) {
  document.querySelectorAll('.section-content').forEach(s => s.style.display = 'none');
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById(sectionId).style.display = 'block';
  document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
  
  if (sectionId === 'kpiSection') {
    animateKPIs();
  }
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  checkMondayMorning();
  showSection('excuseSection');
});